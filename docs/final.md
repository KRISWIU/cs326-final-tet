### Team tet
### The Artchive
### Fall 2022

# Overview

Broadly speaking, our application is meant to be a database of artworks which users can manage in lists and organize. In comparison to sites like MyAnimeList or Goodreads, which are focused on a specific medium, our site allows arbitrary artworks to be added and managed, as well as tags to be created and applied at will (at least in theory.)

# Team members
**PineVoid** - **Jacob Gray**  **Zhenduo Wang**

# User interface



# API

Our API structure is described in milestone2.md. A few functions are out of date (such as search,) but that file has been actively maintained and would take up a lot of space here.

# Database

Our database structure is the same as it was in milestone3.md (and has been actively updated since milestone3). We will refer you to that document in the interest of space.

# URL Routes

As we were unable to implement authentication, all routes should be accessible without it.

Our structure for routing is detailed in milestone2.md, which has been actively updated and maintained since milestone2. We will also refer you to that document in the interest of space.

# Authentication

As of right now, users can be created, but authentication does not work. We were behind on certain things and as such spent a large amount of time implementing backend and server-side functionality, but were unable to carry through and finish it off in terms of adding authentication and login. We also didn't have time to implement hashing and encryption, so **don't** use your personal password on the site.


# Division of Labor

### PineVoid (Jacob Gray)
Note: GitHub commit numbers are greatly inflated by my accidental commit and push of the `node_modules` folder, as well as other things (minor changes to large parts of files, commiting of meta-files like package-lock.json, and frequent merges across branches). As of 12/3/22, I estimate my "actual" numbers for substantial commits, additions, and deletions are somewhere around 50-60 for commits (including ~20 very small commits,) around 500-1500 additions, and around 1000 deletions (have no real clue on that.) 
These are all just guesses, but I feel like I've written 250 to 500 lines of code (I'm inclined to guess 500), and I've written much of the documentation (especially for the later parts). I feel like the additions from documentation should total to between 300-1000 substantial additions, with my guess for it being in the 500 range.

##### HTML: 
- Most of the navbar
- Rough structure of the "explore" boxes on the homepage

##### CSS: 
- Navbar styling
- Some styling for the "explore" boxes on the homepage

##### JS (client-side):
- Wrote the makeRequest function
- Wrote the initial, basic event listener for the search bar

##### JS (server-side):
- Wrote most of the express connection/configuration code
- Wrote most of the API endpoint code
- Wrote `connect` and `disconnect` functions for database access

##### Other:
- Initial project documentation for proposal.md, as well as most of the documentation for milestone2.md and milestone3.md. 
- Created and initially pushed the site to the Heroku app.
- Created the MongoDB Atlas database for the site.

### PineVoid (Zhenduo Wang)

##### HTML: 
- some part of the index.html
- artwork.html for showing the search result
- listPage.html for showing user's lists

##### CSS: 
- Wrote some part of the styling

##### JS (client-side):
- artwork.js for supporting the artwork.html
- main_listPage.js for supporting the listPage.html
- some part of the event listener for other pages

##### Other:
- some part of proposal.md and some part of milestone2.md

### MacNian (Yuxiang Nian)
I just followed Jacob's idea and do some basic work.
#### HTML:
- addPages.html
- login.html 
- Searchresult.html

#### CSS:
-I changed some element sizes in main.css for index.html.
-I changed the outlook of the login page.

#### Js:
-Wrote and implement the addpage.js
-Adding code for goToPage.js
-Adding some listener for combing the signup page, login page, main page and addtowork page

# Additional Information
This project is amazing and I learnt a lot from that.
# Conclusion

As a team, we found the project very challenging overall, perhaps as evidenced by the amount of features we could still implement, but overall, it was very educational. We were surprising by the amount of freedom we had regarding certain design decisions (such as the API) and have started to come to see why certain things are set up the way they are. The most challening aspect was by far the client-side code that we had to do, given that there's a lot to improve about it and it has to be error-resistant since the end-user is facing it.

Dealing with Heroku was also fairly difficult, especially since things which worked locally sometimes failed to work on Heroku, which made for difficult troubleshooting.
