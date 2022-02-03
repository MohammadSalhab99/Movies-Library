'use strict'
require('dotenv').config();
const express = require('express');
const cors = require('cors');
//const MoviesData = require('./data.json');
const axios = require('axios');
const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
const app = express();

app.use(cors());

app.get('/', helloWorldHandler);
app.get('/drinks', drinks)
app.get('/favorite', wolcomingHandler)
app.get('/trending', trending)
app.get('/search', searchf)
app.post('/addMovie', addMovieF)
app.get('/getMovies', getMoviesF)
app.get('*', serverErorr)
app.get('#', pageNotFoundErorr)


const server = express();
server.use(express.json());
server.use(cors());
//let url = `https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`

let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`;
//let turl = `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.APITKEY}&language=en-US`

function createMovie(title, posterPath, overview) {
    this.title = title;
    this.posterPath = posterPath;
    this.overview = overview;


}

function creatDrink(strDrink, strDrinkThumb, idDrink) {
    this.strDrink = strDrink;
    this.strDrinkThumb = strDrinkThumb;
    this.idDrink = idDrink;
}

function helloWorldHandler(req, res) {
    let movie = new createMovie(MoviesData.title, MoviesData.poster_path, MoviesData.overview);
    return res.status(200).json(movie);

}

function drinks(req, res) {
    let drink = new creatDrink(drinkdata.title, drinksdata.poster_path, drinksdata.overview);
    return res.status(200).json(drink);

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

function addMovieF(req, res) {
    const movie = req.body;
    console.log(movie);
    let sql = `INSERT INTO favMovies(strDrink,strDrinkThumb,idDrink) VALUES ($1,$2,$3) RETURNING *;`
    let values = [movie.strDrink, movie.strDrinkThumb, movie.idDrink];
    client.query(sql, values).then(data => {
        res.status(200).json(data.rows);
    }).catch(error => {
        errorHandler(error, req, res)
    });
}

function getMoviesF(req, res) {

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