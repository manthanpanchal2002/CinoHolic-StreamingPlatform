const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    titleInfo: {
        type: String,
    },
    subTitleInfo: {
        type: String,
    },
    contentTitle: {
        type: [String]
    },
    contentInfo: {
        type: [String]
    },
    outro: {
        type: String,
    },
    supportFormLink:{
        type: String,
    },
});

const Privacy = mongoose.model('Privacy', userSchema);
module.exports = Privacy;