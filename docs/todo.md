# Todo list

## HTML work
- [ ] **Jacob**: Implement some kind of "include" functionality for stuff like the navbar

- [ ] **Jacob**: Improve navbar (mainly spacing)
    - [ ] Make buttons look nicer
    - [ ] Vertically center everything
    - [ ] Make resizing nicer
    - [ ] Verify functionality for smaller screens
    - [ ] Improve search bar/dropdown menu

- Improve the homepage:
  - [ ] **Jacob**: Fix grid spacing and element appearance
  - [ ] **Jacob**: Add IDs and documentation on grid in anticipation of JS
  - [ ] Possibly adding more content (not explicitly adding stuff)?

- [ ] Add other HTML classes for use
    - [ ] Add unified UI for tagging system
        - [ ] **Jacob**: Add tag HTML for "boxes" after typing a tag
        - [ ] **Jacob**: Allow adding and removal of tags
    - [ ] Class for artworks/thumbnails (this would help a lot with preventing images become oversized)
        - [ ] Possibly using cards? Would standardize JS stuff, when we get there

- [ ] **Jacob**: Improve login/sign up pages
    - [ ] Honestly, is just about done: maybe just centering or reducing the bar size

- [ ] Add page to display all user's lists

- [ ] Add page to add a work

- [ ] Add page to view a list

- [ ] Add general search page (returns a list of artworks after typing in a search term)

- [ ] Refine search result (artwork) page

## JS work

[Part 2](https://docs.google.com/document/d/1U1iXfvlNBNziRkxjKIaDFUqQ8vpYtjOBgWLPY3GRJxg/edit) of the project:

- [ ] Fix documentation on the API
      - [ ] Fix or add documentation on returned objects and related information
      - [ ] Add examples of API commands and outputs

- [ ] Add rest of the API operations in (if not already done)
      - [ ] Fix formatting on some of the operations, if they're incorrect (may need to allow "querying" or key specification)
      - [ ] Add the actual operations in
      - [ ] 

- [ ] Implement remaining GET API operations
      - [ ] /artworks/{artwork} (Server-side is done)
      - [ ] /artworks/search - (Server side data is dummy data, this will be the hardest command to implement if we want imperfect matching.)
      - [ ] /users/{user}/lists
      - [ ] /users/{user}/list
      - [ ] /tags/{tagName} 
      - [ ] /tags/creator/{creatorName} - will likely revise this: don't actually implement

- [ ] Implement remaining POST API operations
      - [ ] /artworks
      - [ ] /users
      - [ ] /users/{user}/lists/{listName} - This will be edited to have listName as a parameter instead

- [ ] Implement remaining PUT API operations
      - [ ] /artworks/{artwork}
      - [ ] /users/{user}/lists/{listName}

- [ ] Implement remaining DELETE API operations
      - [ ] /artworks/{artwork}
      - [ ] /users/{user}
      - [ ] /users/{user}/lists/{listName}

- [ ] Add necessary JS interactions with other pieces (other event listeners, linking to other pages)
      - Switch webpages upon clicks (may be able to do this with plain HTML)

- [x] **Jacob**: Fix Heroku not working

- [x] Create setup.md with steps described on how to build our project.

- [ ] Potentially change API routing to look nicer by using express.Router()

- [ ] Refactor JS code into multiple files

- [ ] Potentially refactor JS code to use ES6 and modules

## Meta

- [x] Update package.json

- [x] Edit gitignore

- [x] Remove node_modules folder from git

- [x] Update readme or change default displayed document