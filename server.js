const { json } = require('express');
const express = require('express');
const { MongoClient, ObjectId, ListCollectionsCursor } = require('mongodb');

// Start up server
const app = express();
console.log("Server successfully started.");
const port = process.env.PORT || 5000;
console.log("Selected port number is: " + port);

// Function for connecting to database
let uri;
if (!process.env.URI) {
    // For local connection
    console.log("Loading URI from secrets file...");
    let secrets = require('secrets.json');
    uri = secrets.uri;
} else {
    // For heroku
    uri = process.env.URI;
}

/**
 * Connects the given client. 
 * Doesn't do any error checking, so the return value should be checked (at the moment.)
 */
async function connectToDatabase() {
    client = new MongoClient(uri);
    await client.connect();
    return client;
}

async function disconnectFromDatabase(dbClient) {
    await dbClient.close();
}



// Serve basic pages
console.log("Server about to serve basic pages.");
app.use(express.static('src'))
console.log("Server has served basic pages.");


//  ###  GET  ###  \\

/**
 * Returns a JSON object with artwork data for the artwork with the corresponding ID. 
 * Returns null if invalid ID.
 */
app.get("/artworks/:artwork", async (req, res) => {
    console.log("GET /artworks/:artwork called on " + req.params.artwork + ".");
    const artwork = parseInt(req.params.artwork);
    const client = await connectToDatabase();
    const artworksDB = client.db("database1").collection("artworks");
    const queryResult = await artworksDB.findOne({id: { $eq: artwork }});
    if (queryResult === null) {
        console.log("Requested artwork not found.");
        res.json({error: "Artwork could not be found."});
    } else {
        console.log("Successfully retrieved artwork. Artwork is: " + JSON.stringify(queryResult));
        res.json(queryResult);
    }
    await disconnectFromDatabase(client);
    console.log("Response successfully delivered and connection ended.");
});

/**
 * Returns a JSON array with IDs matching the input results. 
 * WIP
 */
app.get("/artworks/search", async (req, res) => {
    console.log("GET /artworks/search called on " + req.url + ".");
    // Default values for queries
    const keywords = req.query.keywords === null ? []: req.query.keywords;
    const posTags = req.query.tags === null ? []: req.query.posTags;
        // No neg tags as of right now
    const limit = req.query.limit === null ? 5: req.query.limit;
    const offset = req.query.offset === null ? 0: req.query.offset;
    const client = await connectToDatabase();
    artworksDB = client.db("database1").collection("artworks");
    
    // !! Database operations not implemented. WIP !!
    res.json([1, 2, 3, 4, 5]);
    console.log("Operation successful.");
    res.end();
});

/**
 * Returns the user database object associated with this username.
 */
app.get("/users/:user", async (req, res) => {
    console.log("GET /users/:user called on " + req.params.user + ".");
    const client = await connectToDatabase();
    usersDB = client.db("database1").collection("users");
    const queryResult = await usersDB.findOne({username: { $eq: req.params.user}});
    if (queryResult === null) {
        console.log("Requested user not found.");
        res.json({error: "The requested user could not be found."});
    } else {
        console.log("Successfully retrieved user. User is: " + JSON.stringify(queryResult));
        res.json(queryResult);
    }
    await disconnectFromDatabase(client);
    res.end();
});

/**
 * Returns a JSON object with all list names and their sizes for this user.
 * Does not return the lists themselves.
 * 
 * This function can likely be optimized by removing the need for the database to send the actual lists over 
 * (it may be possible to format a query which just returns the names and sizes of the lists, saving potentially
 * huge lists from being transmitted for no reason.)
 */
app.get("/users/:user/lists", async (req, res) => {
    console.log("GET /users/:user/lists called on " + req.params.user + ".");
    const client = await connectToDatabase();
    const usersDB = client.db("database1").collection("users");
    const queryResult = await usersDB.findOne({username: { $eq: req.params.user}}, { _id: 0, lists: 1 });
    if (queryResult === null) {
        console.log("Requested user not found.");
        res.json({error: "The requested user could not be found."});
    } else {
        console.log("Successfully retrieved user and lists. User is: " + JSON.stringify(queryResult));
        let returnArr = [];
        // Gets the name and size of each list and appends it to returnArr
        queryResult.lists.forEach( (listObj) => {
            returnArr.push({ "name": listObj.name, "size": listObj.artworks.length });
        }); 
        res.json(returnArr);
    }
    await disconnectFromDatabase(client);
    res.end();
});

/**
 * Returns the ID of the tag with the given name, if it exists.
 */
app.get("/tags/:tagName", async (req, res) => {
    console.log("GET /tags/:tagName called on " + req.params.tagName + ".");
    const client = await connectToDatabase();
    const tagsDB = client.db("database1").collection("tags");
    queryResult = await tagsDB.findOne({name: {$eq: req.params.tagName}}, { _id: 0, id: 1 });
    if (queryResult === null) {
        console.log("Requested tag not found.");
        res.json({error: "The requested tag could not be found."});
    } else {
        console.log("Successfully retrieved tag object. Tag id is: " + JSON.stringify(queryResult));
        res.json(queryResult);
    }
    await disconnectFromDatabase(client);
    res.end();
});

/**
 * Returns the ID of the creator with the given name.
 */
app.get("/creators/:creator", async (req, res) => {
    console.log("GET /creators/:creator called on " + req.params.creator + ".");
    const client = await connectToDatabase();
    const creatorsDB = client.db("database1").collection("creators");
    queryResult = await creatorsDB.findOne({name: {$eq: req.params.creator}}, { _id: 0, id: 1 });
    if (queryResult === null) {
        console.log("Requested creator not found.");
        res.json({error: "The requested creator does not exist."});
    } else {
        console.log("Successfully retrieved creator. Creator is: " + JSON.stringify(queryResult));
        res.json(queryResult);
    }
    await disconnectFromDatabase(client);
    res.end();
});




//  ###  POST  ###  \\
/**
 * Creates a new artwork in the database with given user data. 
 * Returns the object for the new artwork if the operation was successful.
 */
app.post("/artworks", async (req, res) => {
    console.log("POST /artworks called on " + req.url + ".");
    const title = req.query.title;
    const creator = req.query.creator;
    const tags = (req.query.tags ?? '').split(',').map( (tagNum) => { return parseInt(tagNum); });
    // Assuming for now that the values are valid if not null
    if (title === null || creator === null) {
        console.log("Artwork creation failed: one of the queries was null.");
        res.json({error: "A query for artwork creation was null."});
    } else {
        const client = await connectToDatabase();
        const artworksDB = client.db("database1").collection("artworks");
        // _id field will be added automatically
        const numWorks = await artworksDB.countDocuments({}) + 1;
        console.log(numWorks);
        const newArtwork = { 
            // This method will guarantee uniqueness if used consistently, but this method may be changed
            "id": numWorks,
            "title": title,
            "creator": creator,
            "tags": tags,
            "links": [],
            "description": "",
            "img": ""
        };
        try {
            const addResult = await artworksDB.insertOne(newArtwork);
            res.json(addResult);
            console.log("Artwork successfully added to the database!");
        } catch (e) {
            console.log("An error occurred while trying to make artwork " + newArtwork + ".");
            res.json({error: "An error occurred while trying to make artwork."});
        }
    }
    await disconnectFromDatabase(client);
    res.end();
});

/**
 * Creates a new user with the given username and password. 
 * If successful, returns an object for the user.
 * More information in technicalNotes.md
 */
app.post("/users", async (req, res) => {
    console.log("POST /users called for username " + req.query.username + ".");
    const username = req.query.username ?? '';
    const password = req.query.password ?? '';
    // Verify username and password not blank
    // Test these later: they may be flawed.
    const specialCharRegex = /[\!\@\$\%\^\&\*\(\)\_\+\=\[\]\:\;\-]/;
    const invalidCharRegex = /^(?![\w\d\!\@\$\%\^\&\*\(\)\_\+\=\[\]\:\;\-])/;
    
    // specialCharsArr is not used here: will be used for client-side password-checking.
    const specialCharsArr = [ '!', '@', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+', '=', 
            '[', ']', ':', ';']
    if (username === '' || password === '') {
        console.log("Username or password was blank.");
        res.json({error: "Username or password are blank!"});
        return;
    // Verify password is strong enough
    } else if (
            password.length < 8 ||
            password.match(specialCharRegex) === null ||
            password.match(/\d/) === null ||
            password.match(/[a-zA-Z]/) === null ||
            password.match(invalidCharRegex) !== null ||
            password.length > 50) {
        console.log("Password was not strong enough or used invalid characters.");
        res.json({error: "Password is not strong enough or uses invalid characters."});
        return;    
    // Check if username is valid
    } else if (username.match(invalidCharRegex) !== null || username.length > 50) {
        console.log("Username had an invalid character or was too long.");
        res.json({error: "Username has an invalid character or is too long."});
        return;
    }

    // Check if the username is already taken: might want to turn this into a function
    const client = await connectToDatabase();
    const usersDB = client.db("database1").collection("users");
    const existingUser = await usersDB.findOne({username: {$eq: username}}, {_id: 0, username: 1});
    if (existingUser !== null) {
        console.log("Username is already taken.");
        res.json({error: "Username is already taken."});
        await disconnectFromDatabase(client);
        return;
    }

    // Username and password are valid: add the user to the database
    // PASSWORD IS NOT CURRENTLY BEING HASHED: FIX THIS LATER
    try { 
        const newUser = await usersDB.insertOne({ 
                username: username, 
                password: password,
                lists: []});
        res.json(newUser);
    } catch (e) {
        res.json("Error: the user could not be added to the database.");
    }
    await disconnectFromDatabase(client);
});

/**
 * Creates a list named {listName} attached to {user}. 
 * Returns an object with the list name.
 */
app.post("/users/:user/lists/:listName", async (req, res) => {
    const username = req.params.user;
    const listName = req.params.listName;
    console.log("POST /users/:user/lists/:listName called on user " + 
            username + " with list " + listName + ".");
    const client = await connectToDatabase();
    const usersDB = client.db("database1").collection("users");
    // Can probably refine this query to determine existence of name: optimize later
    const userLists = await usersDB.findOne(
            {username: {$eq: username}}, 
            { _id: 0, lists: 1 });
    // Verify this user exists
    if (userLists === null) {
        console.log("List creation failed: user does not exist.");
        res.json({error: "List creation failed: this user does not exist."});
    // Verify this list name is not already taken:
    } else if (userLists.lists.some((list) => { list.name === listName })) {
        res.json({error: "List creation failed: this user already has a list with this name."});
    } else {
        // Add this new list to this user
        console.log("List creation succeeded.");
        await usersDB.updateOne(
                {username: username}, 
                {$push: {lists: {name: listName, artworks: []}}});
        res.json({name: listName});
    }
    await disconnectFromDatabase(client);
});

/*
 * Creates a new tag with the given name.
 */
app.post("/tags", async (req, res) => {
    const tagName = req.query.tagName;
    console.log("POST /tags called on tag " + tagName + ".");
    const client = await connectToDatabase();
    const tagsDB = client.db("database1").collection("tags");
    // Check if there is a tag with this name already
    const existingTag = await tagsDB.findOne({name: {$eq: tagName}}, {name: 1});
    if (existingTag !== null) {
        console.log("The given tag already exists.");
        res.json({error: "The given tag already exists."});
    } else {
        const numTags = await tagsDB.countDocuments({});
        const addResponse = await tagsDB.insertOne({
                id: numTags + 1,
                name: tagName,
                works: []
        });
        res.json(addResponse);
    }
    await disconnectFromDatabase(client);
});

/* 
 * Creates a new creator with the given name. Query parameters are:
 */
app.post("/creators", async (req, res) => {
    const creatorName = req.query.creatorName;
    console.log("POST /tags called on tag " + creatorName + ".");
    const client = await connectToDatabase();
    const creatorsDB = client.db("database1").collection("creators");
    // Check if there is a tag with this name already
    const existingCreator = await creatorsDB.findOne({name: {$eq: creatorName}}, {name: 1});
    if (existingCreator !== null) {
        console.log("The given creator already exists.");
        res.json({error: "The given creator already exists."});
    } else {
        const numCreators = await creatorsDB.countDocuments({});
        const addResponse = await creatorsDB.insertOne({
                id: numCreators + 1,
                name: creatorName,
                works: []
        });
        res.json(addResponse);
    }
    await disconnectFromDatabase(client);
})

//  ###  PUT  ###  \\
/**
 * Changes the indicated property of the artwork to match what the user inputs.
 */
app.put("/artworks/:artwork", async (req,res) => {
    console.log("PUT /artworks called on " + req.url + ".");
    const artwork = parseInt(req.params.id);
    const key = req.query.key ?? '';
    const type = req.query.type ?? '';
    const value = req.query.value ?? '';

    // If we're missing important info, just abort
    if (key === '' || type === '' || value === '') {
        res.json({error: "Key information is missing."});
    // No checking here: assumes the given params are valid, or at the least, not malicious. Will fix in the future
    } else {
        const client = await connectToDatabase();
        const artworksDB = client.db("database1").collection("artworks");
        const keyValObj = {};
        // Technically won't work for resetting the tags, but whatever. Doing this non-explicitly would be ideal, but complicated
        if (key === tags || key === creator) {
            keyValObj[key] = parseInt(value);
        } else {
            keyValObj[key] = value;
        }
        
        // Parse the type of operation
        if (type === "set") {
            updateReq = { $set: keyValObj }
        } else if (type === "push") {
            updateReq = { $push: keyValObj }
        } else if (type === "pop") {
            updateReq = { $pop: keyValObj }
        } else if (type === "pull") {
            updateReq = { $pull: keyValObj }
        } else if (type === "clear") {
            updateReq = { $unset: keyValObj } // Update this: having a value doesn't make much sense
        
            // Invalid operation type
        } else {
            console.log("Artwork update failed due to invalid update type. Given type was: " + type);
            res.json({error: "Artwork update failed due to invalid update type."});
            updateReq = null;
        }
        // After, if the operation is valid...
        if (updateReq !== null) {
            try {
                await artworksDB.updateOne({id: {$eq: artwork}}, updateReq);
                const updatedArtwork = await artworksDB.findOne({id: {$eq: artwork}});
                res.json(updatedArtwork);
            } catch(e) {
                console.log("There was an error editing artwork" + artwork + ".");
            }
        }
    }
    await disconnectFromDatabase(client);
});

/**
 * Alters a list by adding or removing an artwork from it. Returns the list name.
 */
app.put("/users/:user/lists/:listName", async (req, res) => {
    const user = req.params.user;
    const listName = req.params.listName;
    console.log("PUT /users/:user/lists/:listName called on user " + 
            user + " and list " + listName);
    // Verify "artwork" and "add" properties exist
    const artwork = parseInt(req.query.artwork ?? "-1");
    if (artwork < 1 || (req.query.add !== "true" && req.query.add !== "false")) {
        res.json({error: "'artwork' or 'add' query parameters have missing or invalid values."});
        return;
    }
    const isAdd = req.query.add === "true";
    
    const client = await connectToDatabase();
    const usersDB = client.db("database") 
    // Check for the existence of the user and list
    const lists = await usersDB.findOne(
            {username: { $eq: req.params.user}}, 
            { _id: 0, lists: 1 });
    const listIndex = -1;
    lists.forEach( (list, index) => { 
        if (list.name === listName) {
            list = index;
        }
    });
    if (listIndex === -1) {
        console.log("List could not be found.");
        res.json({error: "List could not be found."});
        await disconnectFromDatabase(client);
        return;
    }
    
    // Adding an artwork (will add duplicates)
    if (isAdd) {
        await usersDB.updateOne(
            {username: {$eq: user}}, 
            {$push: { "lists.$[listIndex].artworks": artwork}},
            {arrayFilters: [ {"listIndex": {$eq: listIndex}} ] });
        res.json({name: listName});
    
    // Removing an artwork
    } else {
        // Not currently checking if the artwork is actually in the database
        await usersDB.updateOne(
            {username: {$eq: user}}, 
            {$pull: { "lists.$[listIndex].artworks": artwork}},
            {arrayFilters: [ {"listIndex": {$eq: listIndex}} ] });
    }
    await disconnectFromDatabase(client);
});


//  ###  DELETE  ###  \\
/**
 * Removes the artwork with ID {artwork}.
 */
app.delete("/artworks/:artwork", async (req,res)=>{
    console.log("DELETE /artworks/:artwork called on artwork: " + req.url + ".");
    const artwork = parseInt(req.params.artwork);
    const client = await connectToDatabase();
    const artworksDB = client.db("database1").collection("artworks");
    try {
        const artworkJSON = await artworksDB.findOne({id: artwork});
        await artworksDB.deleteOne({id: {$eq: artwork}});
        res.json(artworksJSON);    
    } catch(e) {
        res.json({error: "Artwork deletion operation failed."});
    }
    await disconnectFromDatabase(client);
});

/**
 * Removes the user with ID {user}. User should be signed in.
 */
 app.delete("/users/:user",(req,res)=>{
    res.write("user delete " + req.params.user + " called.");
    res.end();
});

/**
 * Removes the list with ID {list}. User should be signed in.
 */
 app.delete("/users/:user/lists/:list",(req,res)=>{
    res.write("user's list delete for " + req.params.user + " called.");
    res.end();
});

app.listen(port);
console.log("Application is now listening on port " + port);