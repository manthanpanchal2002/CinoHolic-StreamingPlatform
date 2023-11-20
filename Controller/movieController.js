const Movie = require('../Model/movieModel');
const MovieDetails = require('../Model/movieDetailsModel');
const FavMovie = require('../Model/favMovieModel');
const AsyncErrorHandler = require('./../Utils/AsyncErrorHandler');
const CustomErrorHandler = require('./../Utils/CustomErrorHandler');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


// POST Request to add movie info
exports.createMovie = AsyncErrorHandler(async (req, res, next) => {
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movieData: newMovie
        }
    });
});


// GET Request to get movie info
exports.getMoviesInfo = AsyncErrorHandler(async (req, res, next) => {
    const allMovieInfo = await Movie.find();
    res.status(200).json({
        status: "success",
        data: {
            movieData: allMovieInfo
        }
    });
});


// POST Request to add movie details
exports.movieDetails = AsyncErrorHandler(async (req, res, next) => {
    const newMovie = await MovieDetails.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movieData: newMovie
        }
    });
});


// GET Request to get movie details with parameters (params as id)
exports.getMovieDetailWithId = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await MovieDetails.find({ id: req.params.id });

    if (movieData.length === 0) {
        const err = new CustomErrorHandler("Movie not found", 404);
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data: {
            movieData
        }
    });
});

//  GET Request to get movie with parameters (params as datatype)
exports.getMovieWithDataType = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await Movie.find({ dataType: req.params.dataType });

    if (movieData.length === 0) {
        const err = new CustomErrorHandler("Movie not found", 404);
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data: {
            movieData
        }
    });
});

// POST Request to add movie to favourites
exports.addMovieToFavourites = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await FavMovie.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            movieData
        }
    });
});

// GET Request to get movie from favourites with parameters (params as userId)
exports.getMovieFromFavourites = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await FavMovie.find({ userEmail: req.params.userEmail });

    if (movieData.length === 0) {
        const err = new CustomErrorHandler("Movie not found", 404);
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data: {
            movieData
        }
    });
});

// DELETE Request to remove movie from favorites with parameters (params as movieId)
exports.removeMovieFromFavourites = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await FavMovie.findOneAndDelete({ movieId: req.params.movieId });

    if (movieData.length === 0) {
        const err = new CustomErrorHandler("Movie not found", 404);
        return next(err);
    }
    res.status(200).json({
        status: "success",
    });
});


// PATCH Request to check if movie is already in favorites with parameters (params as movieId)
exports.checkIsFavorite = AsyncErrorHandler(async (req, res, next) => {
    const movieData = await MovieDetails.findOneAndUpdate({ id: req.params.id }, req.body, { new: true, runValidators: true });

    if (movieData.length === 0) {
        const err = new CustomErrorHandler("Movie not found", 404);
        return next(err);
    } else {
        res.status(200).json({
            status: "success",
            data: {
                movieData
            }
        });
    }
});