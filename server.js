 const express = require('express');
const { MongoClient } = require('mongodb');

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
 * Returns a JSON object with artwork data for artwork ID. 
 * null if ID is invalid. Refer to technicalNotes.md 
 * for information about what this will look like.
 */
app.get("/artworks/:artwork", async (req, res) => {
    console.log("GET /artworks/:artwork called on " + req.params.artwork + ".");
    const client = await connectToDatabase();
    console.log("Client is: " + client);
    const artworks = client.db("database1").collection("artworks");
    const queryResult = await artworks.findOne({id: req.params.artwork });
    console.log(queryResult);
    if (queryResult === null) {
        console.log("Requested artwork not found.");
        res.send(null);
    } else {
        console.log("Successfully retrieved artwork. Artwork is: " + JSON.stringify(queryResult));
        res.json(queryResult);
    }
    // res.send("Getting artwork " + req.params.artwork + ":");
    // res.write("artwork retrieval on artwork " + req.params.artwork + " called.");
    await disconnectFromDatabase(client);
    res.end();
    console.log("Response successfully delivered and connection ended.");
});

/**
 * Returns a JSON array with IDs matching the input results.
 */
app.get("/artworks/search", async (req, res) => {
    console.log("GET /artworks/search called on " + req.url + ".");
    // Default values for queries
    const keywords = req.query.keywords === null ? []: req.query.keywords;
    const posTags = req.query.tags === null ? []: req.query.posTags;
        // No neg tags as of right now
    const limit = req.query.limit === null ? 5: req.query.limit;
    const offset = req.query.offset === null ? 0: req.query.offset;
    // Exact database operations can wait: implement some dummy operations for now
    res.json([1, 2, 3, 4, 5]);
    console.log("Operation successful.");
    res.end();
});

/**
 * Returns the ID associated with this username, as well as other potentially 
 * important information.
 */
app.get("/users/:user",  (req, res) => {
    console.log("GET /users/:user called on " + req.params.user + ".");
    res.end();
});

/**
 * Returns an object summarizing basic information of all lists for this user.
 * Does not return the lists themselves.
 */
app.get("/users/:user/lists",  (req, res) => {
    res.write("user's list of " + req.params.user +" retrieval called");
    res.end();
});

/**
 * Returns the ID of the tag with the given name, if it exists.
 */
app.get("/tags/:tagName", (req,res)=>{
    res.write("tag id of  " + req.params.tagName + " retrieval called");
    res.end();
});

/**
 * Returns the ID of the creator with the given name,
 *  if they exist. (May not implement this.)
 */
app.get("/tags/creators/:creator", (req,res)=>{
    res.write("creator ID of " + req.params.creator + " retriveal called");
    res.end();
});




//  ###  POST  ###  \\
/**
 * Creates a new artwork in the database with given user data. 
 * Returns the object for the new artwork if the operation was successful.
 */
app.post("/artworks", (req, res) => {
    res.json({ artwork: 1234567890, creator: 1234567890, msg: "Artwork creation called." });
    res.end();
});

/**
 * Creates a new user with the given username and password. 
 * If successful, returns an object for the user.
 * More information in technicalNotes.md
 */
app.post("/users/", (req, res) => {
    res.write("artwork creation " + req.params.artwork + " called.");
    res.end();
});

/**
 * Creates a list named {listName} attached to {user}. 
 * Returns an object with the list ID.
 */
app.post("/users/:user/lists/:listName/", (req, res) => {
    res.write("artwork creation " + req.params.artwork + " called.");
    res.end();
});




//  ###  PUT  ###  \\
/**
 * Changes the indicated property of the artwork to match what the user inputs.
 */
app.put("/artworks",(req,res)=>{
    res.write("artwork put " + req.params.artwork + " called.");
    res.end();
});

/**
 * Alters a list by adding or removing an artwork from it. Returns the list ID.
 */
app.put("/users/:user/lists/:listName",(req,res)=>{
    res.write("user's list put " + req.params.user + " called.");
    res.end();
});


//  ###  DELETE  ###  \\
/**
 * Removes the artwork with ID {artwork}.
 */
app.delete("/artworks/:artwork",(req,res)=>{
    res.write("artwork delete " + req.params.artwork + " called.");
    res.end();
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