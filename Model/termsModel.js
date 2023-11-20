const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    label: {
        type: String,
    },
    titleInfo: {
        type: String,
    },
    subTitleInfo_P1: {
        type: String,
    },
    subTitleInfo_P2_a: {
        type: String,
    },
    subTitleInfo_P2_b: {
        type: String,
    },
    contentTitle: {
        type: [String]
    },
    contentInfo: {
        type: [String]
    },
    outro_P1_a: {
        type: String,
    },
    outro_P1_b: {
        type: String,
    },
    supportFormLink: {
        type: String,
    },
});

const Terms = mongoose.model('Terms', userSchema);
module.exports = Terms;