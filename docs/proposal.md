# CS326 Final Project - tet

Team Name: **tet**

Application Name: **The Artchive**

Team Overview: 

Zhenduo Wang - **KRISWIU**

Jacob Gray - **PineVoid**

Yuxiang Nian - **MacNian**

## Innovative Idea: 
Our idea is to create a website which allows categorization, organization, and sharing of poems or parts of poems. Our primary source would be [Wikisource](https://wikisource.org/wiki/Main_Page), which hosts open-access poems of all different kinds, but the site would also allow artworks to be added manually by users, included with some kind of link or citation. Artworks could be categorized and organized in various ways: users could tag them, make lists, or connect them to one another via other relationships. It would support the same operations on sections or smaller pieces of these artworks (such as lines or stanzas), allowing various types or parts of poems/art pieces to be manipulated in the same ways.

# Interaction Between Users and Data #

- **User system**: Allows users to sign up, log in, and save things specific to them (currently lists,) whether as private or public.

- **Artwork database**: Initially pulling primarily from Wikisource for poetry, but could in theory be expanded. Stores an object representing each artwork, with various properties attached to it such as applied tags, the creator/artist, the medium, etc. Users can add artworks to the database manually.

- **Lists**: Simple and alterable lists referencing items in the database, attached to the user who made the list.

- **Tags**: Attached to artworks, and primarily optimized for filtering or exploration. User will be able to use pre-existing tags or create their own, and can range broadly from categorizing art into mediums all the way down to marking specific things that artwork features (like water or an apple.)

- **Artwork Pages**: May be removed if too complicated to implement, but artworks that have been used in some non-trivial way will have their own dedicated pages, which users can navigate to. A page for an artwork will contain info about it, tags that have been applied to it, and other user-specific info (such as notes users want to write on the work, or pictures users would like to attach to the artwork.)



# User interface

**Main page**: INSERT WIREFRAME PICTURE
![main_page](https://github.com/KRISWIU/cs326-final-tet/blob/218da2a103123ba250c1089233ff57a3bb7531f8/docs/imgs/mainpage.png)

Our main page will be composed of a navigation bar on the top, a large "discovery" section for the center, and a small bottom portion.

The navigation bar will have the name of the site in the top left, which will redirect users to the home page when clicked. Next to that will be an "add works" button
which will bring users to the "add work" page. The search bar will take up a large portion of the center, and allow users to search for works by name. The filter feature will restrict the results provided by the search function, and will primarily involve users filtering by tags or author. After this will be a "lists" button, which will show users the lists they have, and finally a "sign-in" button, which users can use to log in or sign up. This will change to a different picture once the user has signed in. This section will span the entire page, and should take up about 10% of the screen's height.

The center of our page will be a large box divided into 4 smaller boxes, and smaller boxes inside of these will be works on the site. Each smaller box will have an image or a small amount of information, as well as the title and/or author. This will serve as a "discovery" section, allowing users to find new works on the site and click on them to see more about them. Users will be able to filter this section seperately via another filter button, and see different types of unique works. This section will have 10% margins on each side, and will take up about 80% of the height.

The last 10% on the bottom will be reserved for site contact information, our names, and other more administrative information.

INSERT MAIN PAGE PICTURE

**Artwork page**: INSERT WIREFRAME

May tentatively remove this feature, but would contain information about a specific artwork. Would have dedicated sections for title and author, and contains other sections for aspects like tags.

INSERT IMAGE

**Sign-up page**: INSERT PICTURE

A basic page for users to sign up, if they don't already have accounts. Has two fields for username and password, and a submit button. Will tell the user if their username/password is invalid.

**Search page**: INSERT WIREFRAME

## HTML and CSS ##

**Add work page**: INSERT WIREFRAME

Allows a user to add an artwork to the database. Main things that the user can add are the name, the author, a link to the work, and an image.