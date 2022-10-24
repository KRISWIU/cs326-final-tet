# Information About Interaction Between user and data #

(We can change the detail in the Sat's meeting about detail but this is mainly what I thougt about)


**Main page** going to have a top div, body div, and bottom div. Top is gonna contain a navigation bar which could lead user to different other pages and a link for user to sign in/up. Bottom would be some other stuff such as authorization or contact information about our website. In the main body div, our first tought is to have several divs inside body div. First one is a div that continued showing each of our top books/vedios; second one is a div in grid form which contains severl suggested books/vedios.

* **Top div**'s element(Top div will be 10% height of the page and 100% width): 
    * Navigation bar: 
        * A link which could guide user back to main page
        * A link which could guide user to sign up/in
* **Body div**'s element(Body div will be 80% height of the page and 80% width which can have some space in both left and right):
    * A div which is formed as a grid of 5 col * 6 row . This Bigger grid div would be the left part of our body div (80% of the wideth of body div and 100% height)
        * In each grid inside, is a div which contain a picture and the brief discription for this picture (name/author). If user click on any part of this smaller div, it would lead to **Book/vedio page** for that book/vedio.
    * A div which is formed as a grid of 10 col * 1 row.  (20% of the width of body div and 100% height)
        * In each grid inside, is a div with value of each tag of our book. By clicking the smaller div, it will lead to our **tag page** for that tag.
* **Bottom div**'s element(Bottem div will be 10% height of the page and 100% width):
    * A div which contains our copyright, contact info and other stuff...


**Tag page** going to be classification for each kinds of book/vedio. It's structure will be the same as the main page but only contains the related book/vedio. 


**Book/vedio page** going to be discreption of each book/vedio which could let user to have a deeper undertanding for each book/vedio. This will also have the same stucture as main page, a top div, body div, and bottom div. But for the body div, it will be a picture of the cover and some text information in its first div in body. Second div is gonna be other book/vedios suggested by our algorithms and showing by grid divs.

* **Top div** same as above
* **Body div**'s element(Body div will be 80% height of the page and 80% width which can have some space in both left and right):
    * A div which contains a picture discription and text discription(80% of the wideth of body div and 100% height)
    * A div which is formed as a grid of 10 col * 1 row.  (20% of the width of body div and 100% height)
        * In each grid inside, is a div with value of each tag of our book. By clicking the smaller div, it will lead to our **tag page** for that tag.
* **Bottom div** same as above

## Wireframes ##


## HTML and CSS ##

