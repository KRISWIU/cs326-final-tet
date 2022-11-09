// import 'gotoPages.js';   Importing makes express go big mad: fix later
//nav bar js code

const express = require('express');
const app = express();
const port = 8000;

app.get('/', function(req, res) {
    res.send("Test");
});



app.listen(port);

// Prev code for nav bar js code
// document.getElementById("siteName").addEventListener("click", gotoMainPage());
// document.getElementById('addWork').addEventListener('click', gotoAddWork());