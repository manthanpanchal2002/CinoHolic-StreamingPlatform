const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    youtubeLink: {
        type: String,
    },
    movieName: {
        type: String,
    },
    genre: {
        type: [String],
    },
    keyTheme: {
        type: String,
    },
    castName: {
        type: String,
    },
    directorName: {
        type: String,
    },
    isFavorite: {
        type: Boolean,
    },
});

const MovieDetails = mongoose.model('MovieDetails', userSchema);
module.exports = MovieDetails;