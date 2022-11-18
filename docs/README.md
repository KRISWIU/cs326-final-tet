# CS326 Final Project - tet

Team Name: **tet**

Application Name: **The Artchive**

Team Overview: 

Zhenduo Wang - **KRISWIU**

Jacob Gray - **PineVoid**

Yuxiang Nian - **MacNian**
## Innovative Idea: 
Our idea is to create a website which allows categorization, organization, and sharing of artworks or parts of artworks. Our primary source will be [Wikisource](https://wikisource.org/wiki/Main_Page), which hosts open-access poems of all different kinds, but our site will also allow artworks to be added manually by users, included with some kind of link or citation. Artworks will be categorizable and organizable in various ways: users can tag artworks, make lists, or attach extra personal information to them (such as images). It will support the same operations on sections or smaller pieces of these artworks (such as lines or stanzas), allowing various types or parts of poems/art pieces to be manipulated in the same ways.

We think this would be innovative primarily because although sites like Wikipedia already have great search features, they aren't optimized for personal categorization or segmentation, and the types of artworks they're allowed to use is limited. Our site would allow the segmentation and storage of various types of art without storing them, which means that users could still organize copyrighted, niche, or non-reproducible artworks on our page, but still treat them as if they were there. Our site will also allow arbitrary artworks, including things like Youtube Videos, online essays, tweets, etc. Sites like this exist (eg. [Goodreads](https://www.goodreads.com/)), but they are often oriented only towards a single medium (such as traditional written material.) 

## Important Components: 
There will be several important components to our site:

**User system**: Allows users to sign up, log in, and save things specific to them, whether as private or public.

**Artwork database**: Initially pulling primarily from Wikisource for poetry, but could in theory be expanded. The site will store objects representing each artwork, with properties such as title, creator(s), tags, etc., attached to it.

**Lists**: Simple lists referencing items in the database, attached to the user who makes them.

**Tags**: Attached to artworks, and primarily optimized for filtering or exploration. A tag is "binary" in the sense that it either has the tag or does not.

**Segmenting works**: Allows users to manipulate smaller parts of a work. This feature may not be added.

## Hosted website link

https://the-artchive.herokuapp.com/