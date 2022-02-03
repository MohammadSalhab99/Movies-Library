DROP TABLE IF EXISTS favMovies;

CREATE TABLE IF NOT EXISTS favMovies (
     strDrink varchar(1000),
     strDrinkThumb varchar(1000),
     idDrink SERIAL PRIMARY KEY
);
