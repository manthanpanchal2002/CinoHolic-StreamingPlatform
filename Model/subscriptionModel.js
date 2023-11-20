const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    contentTitle: {
        type: [String]
    },
    contentSubtitle:{
        type: [String]
    },
    contentInfo: {
        type: [String]
    },
    cost:{
        type: [String]
    },
    info:{
        type: [String]
    },

});

const Subscription = mongoose.model('Subscription', userSchema);
module.exports = Subscription;