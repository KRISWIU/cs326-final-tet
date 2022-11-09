const express = require('express');
const app = express();
const port = 8000;


// app.use()

app.get('/', function(req, res) {
    res.send("Test");
});



app.listen(port);
