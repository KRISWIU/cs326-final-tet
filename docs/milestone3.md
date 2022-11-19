## Database configuration

We are using MongoDB for our database, and it's hosted on MongoDB Atlas. Our cluster is composed of one database, called "database1", and it consists of 4 collections (more of which may be added:)

**Notes**: 
- Unless otherwise stated, the ID for any given collection is unique only for that collection. So there will be multiple items with ID 1, spread out across the different collections. An item with ID 1 in the *artworks* collection is completely seperate from the item with ID 1 in any other collections. 
- Keep in mind that the "_id" field is required for every object in the database, so we omit listing it.


### artworks
This collection is used to store data for artworks. Each document in this database will be an object representing an artwork, with the following fields:

**Required fields:**
- id - int used to uniquely refer to this artwork.
- title - string indicating the title of this piece. Can be an empty string.
- creator: - int for the artwork creator's ID. May be rewritten to be an array, to allow for multiple creators. 0 indicates no creator or an anonymous creator.
- tags - int array for holding the IDs of the tags applied to this artwork.

**Optional fields:**
- img - String URL to the default img displayed for this artwork.


### creators
This collection stores data on creators of artworks. A creator should only be in this collection if they have at least one work in the database. The document for each creator will have the following fields:
- id - int uniquely identifying this creator.
-
-


### tags
Collection storing information on all of the existing tags. Each document will consist of:

**Required fields:**
- id - unique identifier for this tag.
- name - string indicating the name of this tag. Should be unique. Cannot be empty.
- works - int array storing all of the works with this tag.

**Optional fields:**
None as of right now.


### users
This collection is used to store user data. Each user has their own unique document, with the following fields:

**Required fields:**
- id - int used to uniquely refer to this user.
- username - string used for when the user logs in. Must also be unique.
- password - string used to authenticate the user. Stored as a hashed and salted string.
- lists - 2D int array storing (at the highest level) lists, and then the IDs of the works in each list.

**Optional fields:**
None as of right now.