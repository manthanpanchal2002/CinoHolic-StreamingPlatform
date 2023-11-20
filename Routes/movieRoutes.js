const express = require('express');
const movieController = require('./../Controller/movieController');

const router = express.Router();

// Create movie route
router.route('/create-movie').post(movieController.createMovie);

// Get movie route
router.route('/get-movies-info').get(movieController.getMoviesInfo);

// Create movie details route
router.route('/movie-details').post(movieController.movieDetails);

// Get movie details with parameter route
router.route('/movie-details/:id').get(movieController.getMovieDetailWithId);

// Get movie with parameter route
router.route('/movie/:dataType').get(movieController.getMovieWithDataType);

// Add to favourite route
router.route('/add-to-favourite').post(movieController.addMovieToFavourites);

// Get favourite movie route
router.route('/get-favourite-movies/:userEmail').get(movieController.getMovieFromFavourites);

// Delete favourite movie route
router.route('/delete-favourite-movie/:movieId').delete(movieController.removeMovieFromFavourites);

// Update favourite movie route
router.route('/check-isFavorite/:id').patch(movieController.checkIsFavorite);

module.exports = router;