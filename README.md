# WebProgrammingProjCs32

Team Name: **tet**

Application Name: **The Artchive**

Team Overview: 

Zhenduo Wang - **KRISWIU**

Jacob Gray - **PineVoid**

Yuxiang Nian - **MacNian**
## Innovative Idea: 
Our idea is to create a website which allows categorization, organization, and sharing of poems or parts of poems. Our primary source would be [Wikisource](https://wikisource.org/wiki/Main_Page), which hosts open-access poems of all different kinds, but the site would also allow artworks to be added manually by users, included with some kind of link or citation. Artworks could be categorized and organized in various ways: users could tag them, make lists, or connect them to one another via other relationships. It would support the same operations on sections or smaller pieces of these artworks (such as lines or stanzas), allowing various types or parts of poems/art pieces to be manipulated in the same ways.

We think this would be innovative primarily because although sites like Wikipedia already have great search features, they aren't optimized for personal categorization or segmentation, and the types of artworks they're allowed to use is limited. Our site would allow the segmentation and storage of various types of art without storing them, which means that users could still organize copyrighted, niche, or non-reproducible artworks on our page, but still treat them as if they were there. We could also add a social aspect to the site not found on other similar sites. Sites like this exist (eg. [Goodreads](https://www.goodreads.com/)), but they are often oriented only towards a single medium (such as novels or longer books.) 

## Important Components: 
There would be several important components to our site:

**User system**: Allows users to sign up, log in, and save things specific to them, whether as private or public.

**Artwork database**: Initially pulling primarily from Wikisource for poetry, but could in theory be expanded. Could store objects representing each artwork, with various properties or bits of information tied to it.

**Lists**: Simple linked lists referencing items in the database, attached to users or attached to the system if created dynamically.

**Tags**: Attached to artworks, and primarily optimized for filtering or exploration. Likely implemented as a kind of database with tag names having a list of all the artworks with that tag.

**Segmenting**: Allows users to manipulate smaller parts of a work. Could be treated as another artwork in the database, but with additional properties (such as "originally from" and "positionInWork".)

## Future Implementation:
There going to have several pages in our website. 

**Main page** going to have a top div, body div, and bottom div. Top is gonna contain a navigation bar which could lead user to different other pages and a link for user to sign in/up. Bottom would be some other stuff such as authorization or contact information about our website. In the main body div, our first tought is to have several divs inside body div. First one is a div that continued showing each of our top books/vedios; second one is a div in grid form which contains severl suggested books/vedios. 

**Book/vedio page** going to be discreption of each book/vedio which could let user to have a deeper undertanding for each book/vedio. This will also have the same stucture as main page, a top div, body div, and bottom div. But for the body div, it will be a picture of the cover and some text information in its first div in body. Second div is gonna be other book/vedios suggested by our algorithms and showing by grid divs.
