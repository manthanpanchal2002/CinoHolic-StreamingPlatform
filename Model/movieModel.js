const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: [true, 'Please provide your id'],
        unique: true,
    },
    imgPath: {
        type: String,
        required: [true, 'Please provide your imgPath'],
    },
    movieName: {
        type: String,
        required: [true, 'Please provide your movieName'],
    },
    duration: {
        type: String,
        required: [true, 'Please provide your duration'],
    },
    genre: {
        type: String,
        required: [true, 'Please provide your genre'],
    },
    rating: {
        type: String,
        required: [true, 'Please provide your rating'],
    },
    dataType :{
        type: String,
        required: [true, 'Please provide your dataType'],
    }
});


const Movie = mongoose.model('Movie', userSchema);
module.exports = Movie;