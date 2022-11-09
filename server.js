const { response } = require('express');
const express = require('express');
const app = express();
const port = 8000;


// app.use()

app.get('/', function(req, res) {
    app.use(express.static('src'));
});

app.listen(port);
