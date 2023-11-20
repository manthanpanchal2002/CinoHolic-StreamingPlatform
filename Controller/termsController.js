const Terms = require('../Model/termsModel');
const AsyncErrorHandler = require('./../Utils/AsyncErrorHandler');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// ------------------------------ Terms ------------------------------
// POST Request to add data
exports.addTerms = AsyncErrorHandler(async (req, res, next) => {
    const newTerms = await Terms.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            terms: newTerms
        }
    });
});

// GET Request to get data
exports.getTerms = AsyncErrorHandler(async (req, res, next) => {
    const terms = await Terms.find();
    res.status(200).json({
        status: 'success',
        data: {
            terms
        }
    });
});