'use strict'

const express = require('express');
const cors = require('cors');
const MoviesData = require('./data.json');


const app = express();

app.use(cors());

app.get('/', helloWorldHandler);
app.get('/favorite', wolcomingHandler)
app.get('*', serverErorr)
app.get('#', pageNotFoundErorr)

function createMovie(title, posterPath, overview) {
    this.title = title;
    this.posterPath = posterPath;
    this.overview = overview;


}

function helloWorldHandler(req, res) {
    let movie = new createMovie(MoviesData.title, MoviesData.poster_path, MoviesData.overview);
    return res.status(200).json(movie);

}

function wolcomingHandler(req, res) {
    return res.status(200).send('Welcome to Favorite Page')
}

function serverErorr(req, res) {
    return res.status(500).send("sorry, something went wrong")
}

function pageNotFoundErorr(req, res) {
    return res.status(404).send("Page Not found")
}
app.listen(3000, () => {

    console.log('listening to port 3000')
})