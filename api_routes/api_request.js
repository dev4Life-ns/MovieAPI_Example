const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();


//GET method 
const getActionMovies = async (req, res, next) => {
  try {
    const fileData = fs.readFileSync(path.join(__dirname, './movieAPI.json'));
    const movieAPI= JSON.parse(fileData);
    const movieFeed = movieAPI.find(movie => movie.id === Number(req.params.id));
    if (!movieFeed) {   
      const err = new Error('Movie details not found');
      err.status = 404;
      throw err;
    }
    res.json(movieFeed);
  } catch (e) {
    next(e);
  }
};

router
  .route('/api/p1/movieAPI/:id')
  .get(getActionMovies);

module.exports = router;


//POST method with router specifications
const createMovieList = async (req, res, next) => {
    try {
      const fileData = fs.readFileSync(movieFilePath);
      const movieAPI = JSON.parse(fileData);

      const newMovies = {
        title: req.body.title,
        image: req.body.cover_image,
        id: req.body.id,
        language: req.body.original_language,
        synopsis: req.body.synopsis,
        media: req.body.media_type,
        genre: req.body.genre_id,
        rating: req.body.rating,
        release: req.body.release_date,
      };
      movieAPI.push(newMovies);
      fs.writeFileSync(movieFilePath, JSON.stringify(movieAPI));
      res.status(201).json(newMovies);
    } catch (e) {
      next(e);
    }
  };
  
  router
    .route('/api/p1/movieAPI')
    .post(createMovieList);



    //update movie list using PUT method and router specifications
    const updateMovieFeed = async (req, res, next) => {
        try {
          const fileData = fs.readFileSync(movieFilePath);
          const movieAPI = JSON.parse(fileData);
          const movieFeed = movieAPI.find(movies => movies.id === Number(req.params.id));
          if (!movieFeed) {
            const err = new Error('Movie not found');
            err.status = 404;
            throw err;
          }
          const newMovieData = {
            title: req.body.title,
            image: req.body.cover_image,
            id: req.body.id,
            language: req.body.original_language,
            synopsis: req.body.synopsis,
            media: req.body.media_type,
            genre: req.body.genre_id,
            rating: req.body.rating,
            release: req.body.release_date,    
          };

          const newMovies = movieAPI.map(movies => {
            return (movies.id === Number(req.params.id) ? newMovieData : movies);
          });
          fs.writeFileSync(movieFilePath, JSON.stringify(newMovies));
          res.status(200).json(newMovieData);
        } catch (e) {
          next(e);
        }
      };

      router
        .route('/api/v1/stats/:id')
        .get(getActionMovies)
        .put(updateMovieFeed);


        // method to delete old movies or unpopular movies goes here


        /* uncomment to use
          router
             .route('/api/p1/:id')
             .get(getActionMovies)
             .put(updateMovieFeed)
             .delete(deleteMovie);
        */
