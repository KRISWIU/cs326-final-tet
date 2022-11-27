# Database configuration

We are using MongoDB for our database, which is hosted on MongoDB Atlas. Our cluster is composed of one database, called "database1", and it consists of 4 collections (more of which may be added:)

**Notes**: 
- Unless otherwise stated, the plain `id` field for any given collection is unique only for that collection. So an item with `id` 1 in the *artworks* collection is completely seperate from the items with ID 1 in all the other collections. 
- Keep in mind that the `_id` field is required for every object in the database, and we don't directly use it, so we omit listing it.


### artworks
This collection is used to store data for artworks. Each document in this database will be an object representing an artwork, with the following fields:

**Required fields:**
- `id` - int used to uniquely refer to this artwork.
- `title` - string indicating the title of this piece. Can be an empty string.
- `creator` - int for the artwork creator's ID. May be rewritten to be an array, to allow for multiple creators. 0 indicates no creator or an anonymous creator.
- `tags` - int array for holding the IDs of the tags applied to this artwork.
- `links` - string array for holding URLs related to the artwork.

**Optional fields:**
- `img` - String URL to the default img displayed for this artwork.
- `dateAdded` - string indicating when the artwork was added, in format mm/dd/yyyy.

*Example document:*
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


### creators
This collection stores data on creators of artworks. A creator should only be in this collection if they have at least one work in the database. The document for each creator will have the following fields:

**Required fields:**
- `id` - int uniquely identifying this creator.
- `name` - string indicating this creator's name. 
- `links` - string array holding URLs connected to the creator.
- `works` - int array holding ids of works connected to this creator.

**Optional fields:**
None as of right now.

*Example document:*
```
{
    "_id": "000000000000000",
    "id": 3,
    "name": "T.S. Eliot",
    "links": ["https://www.poetryfoundation.org/poets/t-s-eliot", "https://en.wikipedia.org/wiki/T._S._Eliot"],
    "works": [2]
}
```


### tags
Collection storing information on all of the existing tags. Each document will consist of:

**Required fields:**
- `id` - unique identifier for this tag.
- `name` - string indicating the name of this tag. Should be unique. Cannot be empty.
- `works` - int array storing all of the works with this tag.

**Optional fields:**
None as of right now.

*Example document:*
```
{
    "_id": "000000000000000",
    "id": 5,
    "name": "poem",
    "works": [2, 3, 4]
}
```


### users
This collection is used to store user data. Each user has their own unique document, with the following fields:

**Required fields:**
- `username` - string which effectively serves as the user's id. Required for login and must be unique.
- `password` - string used to authenticate the user. Stored as a hashed and salted string.
- `lists` - object array storing list objects. Each list object has a `name` property with a unique name, and a `artworks` property, which is an array containing the int IDs of the artworks in the list.

**Optional fields:**
None as of right now.

*Example document:*
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

## Currently working features:

Currently, our database works fine and has some basic data, although not all operations are implemented on the server. We should support GET, POST, PUT, and DELETE for artworks, but testing them will have to be done through CURL or some other kind of console. Examples of everything and how to call them are either included in here or milestone2.md (which has been updated but not finished since the last milestone due date.)

Heroku currently has issues (we are mainly struggling with switching pages,) but this may be resolved soon.


# Division of Labor
- **Jacob Gray - PineVoid** - Database creation, population, and documentation. Also revised documentation in milestone2.md and technicalNotes. Devised the overall database structure and document structure. Wrote small segments of database code (particularly initial code for `GET artworks/:artwork` in server.js).