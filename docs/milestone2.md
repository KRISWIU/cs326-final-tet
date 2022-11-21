# API

## Part 0/1

Our API will be a REST API, with the following methods:

- GET - Retrieves data
- POST - Creates new data
- PUT - Changes existing data
- DELETE - Deletes existing data

All methods will return JSON objects with information about the request. In the event of failure or something not existing, an empty JSON object will be returned instead.

Common parameters:
- artwork - Unique identifier for each artwork in the database.
- user - Unique ID for each user.
- list - list ID. Note that this is attached to each user, so each list has a single ID, but that ID is not unique across users.
- tag - tag ID. One for each tag.


# Endpoints


## GET


#### /artworks/{artwork}
Returns a JSON object with artwork data for artwork ID. Empty object if ID is invalid.

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
[
  { artwork1 },
  { artwork2 },
  { artwork3 }
]

### /users/{username}
Returns the ID associated with this username, as well as other potentially important information.

#### /users/{user}/lists
Returns an object summarizing basic information of all lists for this user. Does not return the lists themselves.

#### /users/{user}/lists/{list}
Returns the list object. Described in more detail in technicalNotes.md.

#### /tags/{tagName}
Returns the ID of the tag with the given name, if it exists.

#### /tags/creators/{creator}
Returns the ID of the creator with the given name, if they exist. (May not implement this.)


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
Creates a new user with the given username and password. If successful, returns an object for the user. More information in technicalNotes.md.
Format:


#### /users/{user}/lists/{listName}
Creates a list named {listName} attached to {user}. Returns an object with the list ID.


## PUT


#### /artworks/{artwork}
Changes the indicated property of the artwork to match what the user inputs.
  - key - **Required** string which indicates property to change (eg. title, tags).
  - type - **Required** string which indicates the type of operation on the key. One of "set", "push", "pop", or "unset". Note that `remove` affects the field, while the others merely affect values. Future modifications will allow more complicated operations. 
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
