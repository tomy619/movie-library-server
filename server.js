var express = require('express');
var app = express()
const fs = require('fs');
var bodyParser = require('body-parser');
var cors = require("cors");

app.use(express.static("./static_assets"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

require('./app/config')

app.get('/', (req, res) => {
    res.send('<h1>SUCCESS</h1.');
})

var movie = require(__dirname + '/api/movie');
app.use('/getMovie', movie);

var paginatedMovie = require(__dirname + '/api/paginatedMovie');
app.use('/getPaginatedMovie', paginatedMovie);

app.listen(process.env.PORT || 8080, () => console.log("SERVER STARTTED AT 8080"))

module.exports = app;