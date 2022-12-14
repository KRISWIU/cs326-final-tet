# API

## Part 0/1

Our API will be a REST API, with the following methods:

- GET - Retrieves data
- POST - Creates new data
- PUT - Changes existing data
- DELETE - Deletes existing data

All methods will return JSON objects with the requested information. In the event of failure, an object with only the `error` field will be returned, with a string detailing the error. This string is often safe to print and show to the end user.

Common parameters:
- `artwork` - integer artwork id. Unique for each artwork.
- `user` - string username for each user. Unique.
- `list` - string username for this list. Unqiue for each user.
- `tag` - integer tag ID. Unique for each tag.


# Endpoints


## GET


#### /artworks/{artwork}
Returns a JSON object with the database object for the artwork with the corresponding ID.

**Example command:**
`curl -X GET https://the-artchive.herokuapp.com/artworks/2 -H "Content-Type: application.json"`

**Example response:**
```
{
  "_id": "000000000000000",
  "id": 2,
  "title": "The Waste Land",
  "creator": 3,
  "tags": [5],
  "links": ["https://www.poetryfoundation.org/poems/47311/the-waste-land"],
  "dateAdded": "11/19/2022"
}
```

#### /artworks/search
Returns a JSON object with IDs matching the input results. Search format is:
- keywords - string which matches to titles, authors, etc. Exact specifics may be changed.
- posTags - comma-seperated list of numbers which map to tags. All returned search results will have these tags.
- negTags - comma-seperated list of numbers which map to tags. No returned search result will have any of these tags. (May not implement this.)
- limit - maximum number of results to return.
- offset - number indicating which result to start displaying at (useful when seperating search results into pages.)

**Example command:**
`curl -X GET https://the-artchive.herokuapp.com/artworks/search?keywords=The-Waste-Land&posTags=[5] -H "Content-Type: application.json"`

**Example response:**
```
[
  { artwork1 },
  { artwork2 },
  { artwork3 }
]
```

### /users/{user}
Returns the user database object associated with this username. May be changed to be more restricted in scope.

**Example command:**
`curl -X GET https://the-artchive.herokuapp.com/users/CoolGuy3 -H "Content-Type: application.json"`

**Example response:**
```
{
    "_id": "000000000000000",
    "username": "test",
    "password": "password123",  // Will ordinarily be hashed, but not implemented as of now
    "lists": [
        { 
            "name": "Favorites", 
            "artworks": [
                1, 
                2
            ] 
        }, 
        { 
            "name": "new list", 
            "artworks": [] 
        }
    ]
}
```

#### /users/{user}/lists
Returns an object with a `lists` field, which is an array of objects. Each object corresponds to a list containing a string `name` propety as well as an int `size` property. 
Does not return the lists themselves. `lists` will be an empty array if there are no lists.

**Example command:**
`curl -X GET https://the-artchive.herokuapp.com/users/CoolGuy3/lists -H "Content-Type: application.json"`

**Example response:**
```
{
  "lists": [
    { 
        "name": "Favorites", 
        "size": 2 
    },
    {
        "name": "new list",
        "size": 0
    }
  ]
}
```

#### /users/{user}/lists/{list}
Returns the database list object for this user, given the list name.
Returns null if the list or user doesn't exist.

**Example command:**
`curl -X GET https://the-artchive.herokuapp.com/users/CoolGuy3/lists/Favorites -H "Content-Type: application.json"`

**Example response:**
```
{ 
    "name": "Favorites", 
    "artworks": [
        1, 
        2
    ] 
}
```

#### /tags/{tagName}
Returns a JSON object with field `id` containing the ID for this tag.
Returns null if there is no tag with this name.

`curl -X GET https://the-artchive.herokuapp.com/tags/poem -H "Content-Type: application.json"`

**Example response:**
```
{ 
    "id": 5
}
```

#### /tags/{tagID}
Returns the database JSON object corresponding to this tag, given the id.
Returns null if there is no tag with this id.

`curl -X GET https://the-artchive.herokuapp.com/tags/5 -H "Content-Type: application.json"`

**Example response:**
```
{
    "_id": "000000000000000",
    "id": 5,
    "name": "poem",
    "works": [2, 3, 4]
}
```

#### /creators/{creator}
Returns the ID of the creator with the given name, if they exist.


## POST


#### /artworks
Creates a new artwork in the database with given user data. Returns the object for the new artwork if the operation was successful. Creation format is:
  - title - string of this artwork's title. Can be blank, but will need other data if left blank.
  - creator - ID for creator of this piece.
  - tags - list of numbers seperated by commas, indicating the tags to apply to the artwork upon creation. Will not create the artwork if tags do not exist.

  **Example command:**
`curl -X POST https://the-artchive.herokuapp.com/artworks?title="The Waste Land"&creator=3&tags=5 -H "Content-Type: application/json"`

**Example response:**
```
{
  "_id": "000000000000000",
  "id": 2,
  "title": "The Waste Land",
  "creator": 3,
  "tags": [5],
  "links": [],
}
```

#### /users
Creates a new user with the given username and password. If successful, returns an object for the user. User object structure is described in milestone3.md.
Format:


#### /users/{user}/lists/{listName}
Creates a list named {listName} attached to {user}. Returns an object with the list ID.

#### /tags
Creates a new tag with the given name. Query paramaters are:
- tagName - string - Indicates the name of the tag to be created. 

#### /creators
Creates a new creator with the given name. Query parameters are:
- creator - string - Indicates the name of the creator to be added to the database.

## PUT


#### /artworks/{artwork}
Changes the indicated property of the artwork to match what the user inputs.
  - key - **Required** string which indicates property to change (eg. title, tags).
  - type - **Required** string which indicates the type of operation on the key. One of "set", "push", "pop", "pull", or "unset". Note that `unset` actually removes the field, while the others merely affect values.
  - value - **Required** string which indicates what value to set the key to. This should match directly how it should be stored in the database: eg., if the key holds an ID, this value should be an ID. If the key holds a link, the value should be a link.

#### /users/{user}
Changes the indicated property of the user to match what the user inputs.
  - key - **Required** string which indicates property to change (eg. username, password). 
  - value - **Required** string which indicates what value to set the key to. This should match directly how it should be stored in the database: eg., if the key holds an ID, this value should be an ID. If the key holds a link, the value should be a link.

#### /users/{user}/lists/{listName}
Alters a list by adding or removing an artwork from it. Returns the list ID. Format is:
  - add - **Required** boolean (T/F) value indicating whether the command is to add or to remove an artwork. Following format changes as follows:
For add = true, only requirement:
  - artwork - **Required** number ID of the artwork to add to the list.
For add = false, require exactly one of the following:
  - artwork - number ID of the artwork to remove from the list.
  - index - number indicating the index in the list of the artwork to remove (eg. the 3rd artwork in the list.)


## DELETE


#### /artworks/{artwork}
Removes the artwork with ID {artwork}.

#### /users/{user}
Removes the user with ID {user}. User should be signed in.

#### /users/{user}/lists/{list}
Removes the list with ID {list}. User should be signed in.

#### /site
Deletes everything (just kidding...)


# Part 3
![image](https://user-images.githubusercontent.com/112954041/201002396-cfb88256-5e03-4f6f-b4ec-eb56f3f22928.png)

Link to hosted Heroku site: 

https://the-artchive.herokuapp.com/


# Contributions

**PineVoid - Jacob** - Initial creation of server.js, searchBar listener in main.js, heroku, and part 0 documentation

**Zhenduo Wang - KRISWIU** - Implementation of most of GET, POST, PUT, DELETE in server.js, and filter and login listener in main.JS

**Yuxiang Nian - MacNian** - Creation of searchResult page
