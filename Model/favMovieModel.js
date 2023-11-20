const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        unique: true,
    },
    movieId: { 
        type: String, 
        unique: true 
    },
    movieName: {
        type: String,
    },
    genre: {
        type: [String],
    },
});

const FavMovie = mongoose.model('FavMovie', userSchema);
module.exports = FavMovie;