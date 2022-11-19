# Fundamental data objects:

### Artwork object:
JS object with the following fields:
- **name** - **Required string** - indicates work's name. Empty string allowed.
- **creator** - **Required string** - holds the creator's name. Empty string allowed.
- **link** - **Required string array** - holds the url(s) to the work or to some site associated with the work. Assumed to always exist. Empty array allowed.
- **tags** - **Required string array** - holds tag IDs for this work. Empty array allowed.
- **dateAdded** - **Required string** - holds the date this artwork was added to the database.


Potential optional fields (may not exist!)
- **creatorLink** - **string** - holds a link to the creator's site or creator info.


# HTML Classes

- **Jacob WIP:** Artwork class
Will standardize what artworks in the homepage grid will look like, as well as on the search result page.