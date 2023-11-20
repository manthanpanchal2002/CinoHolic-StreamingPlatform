const Subscription = require('../Model/subscriptionModel');
const AsyncErrorHandler = require('./../Utils/AsyncErrorHandler');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// ------------------------------ Subscription ------------------------------
// POST Request to add data
exports.addSubscription = AsyncErrorHandler(async (req, res, next) => {
    const newSubscription = await Subscription.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            subscription: newSubscription
        }
    });
});

// GET Request to get data
exports.getSubscription = AsyncErrorHandler(async (req, res, next) => {
    const subscription = await Subscription.find();
    res.status(200).json({
        status: 'success',
        data: {
            subscription
        }
    });
});