const Privacy = require('../Model/privacyModel');
const AsyncErrorHandler = require('./../Utils/AsyncErrorHandler');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// ------------------------------ Privacy ------------------------------
// POST Request to add data
exports.addPrivacy = AsyncErrorHandler(async (req, res, next) => {
    const newPrivacy = await Privacy.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            privacy: newPrivacy
        }
    });
});

// GET Request to get data
exports.getPrivacy = AsyncErrorHandler(async (req, res, next) => {
    const privacy = await Privacy.find();
    res.status(200).json({
        status: 'success',
        data: {
            privacy
        }
    });
});