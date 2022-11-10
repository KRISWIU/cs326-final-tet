const { response } = require('express');
const express = require('express');
const app = express();
const port = 8000;
const router = express.Router();

// Serve basic pages
app.use(express.static('src'))


// Implement the commands from the documentation and add statements for all of the possible routes. 
// Functions don't actually have to do much right now


//  ###  GET  ###  \\

app.get("/artworks/:artwork", (req, res) => {
    res.write("artwork retrieval on artwork " + req.params.artwork + " called.");
    res.end();
});

app.get("/artworks/search", (req, res) => {
    res.write("artwork search " + req.params.artwork + " called.");
    res.end();
});

// The rest go here

//  ###  POST  ###  \\

app.post("/artworks", (req, res) => {
    res.write("artwork creation " + req.params.artwork + " called.");
    res.end();
});


//  ###  PUT  ###  \\
app.put("/artworks",(req,res)=>{
    res.write("artwork put " + req.params.artwork + " called.");
    res.end();
});

//  ###  DELETE  ###  \\
app.delete("/artworks",(req,res)=>{
    res.write("artwork delete " + req.params.artwork + " called.");
    res.end();
});



app.listen(port);
