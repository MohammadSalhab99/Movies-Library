'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MoviesData = require('./data.json');
const axios = require('axios');



const app = express();

app.use(cors());

app.get('/', helloWorldHandler);
app.get('/favorite', wolcomingHandler)
app.get('/trending', trending)
app.get('/search', searchf)
app.get('*', serverErorr)
app.get('#', pageNotFoundErorr)


//let url = `https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`

let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
//let turl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APITKEY}&language=en-US`

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

function trending(req, res) {
    axios.get(url).then(data => {
        console.log(data.data.drinks);
        return res.status(200).json(data.data.drinks);
    }).catch((err) => { console.log(err.message) })
}

function searchf(req, res) {
    axios.get(url).then(data => {
        console.log(data.data.dirnks);
        return res.status(200).json(data.data.drinks);
    }).catch((err) => { console.log(err.message) })

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