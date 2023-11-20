const User = require('../Model/userModel');
const AsyncErrorHandler = require('./../Utils/AsyncErrorHandler');
const bcrypt = require('bcryptjs');
const sendEmail = require('./../EmailServices/emailServiceForForgotPassword');
const getEmail = require('./../EmailServices/emailServiceForUserIssues');
const dotenv = require('dotenv');
const CustomErrorHandler = require('../Utils/CustomErrorHandler');
dotenv.config({ path: './config.env' });

// ------------------------------ User Authentication ------------------------------
// POST Request to create new user
exports.signUp = AsyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});

// POST Request to Sign-In user
exports.signIn = AsyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
        return next(new Error('Please provide email and password'));
    }

    // Check if user exists and password is correct
    const isExist = await User.findOne({ email: email }).select('+password');

    if (!isExist || !(await isExist.comparePassword(password, isExist.password))) {
        const error = new CustomErrorHandler('Invalid email or password', 400);
        return next(error);
    }

    res.status(200).json({
        status: 'success',
    });

});

// GET Request with parameter
exports.UserDetailsWithEmailID = AsyncErrorHandler(async (req, res, next) => {
    const userData = await User.find({ email: req.params.email });

    if (userData.length === 0) {
        const err = new CustomErrorHandler("User not found", 404);
        return next(err);
    }
    res.status(200).json({
        status: "success",
        data: {
            userData
        }
    });
});

// PATCH Request to update user data
exports.UpdateUserData = AsyncErrorHandler(async (req, res, next) => {
    
    // Check if the request includes a new password
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 15);
    }

    const newData = await User.findOneAndUpdate({email : req.params.email}, req.body,{new : true, runValidators : true});

    if (newData.length === 0) {
        const err = new CustomErrorHandler("User not found", 404);
        return next(err);
    }
    
    res.status(200).json({
        status: "success",
        data : {
            newData
        }
    });
})

// POST request for forgot password
exports.forgotPassword = AsyncErrorHandler(async (req, res, next) => {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
        return next(new Error('Please provide email'));
    }

    // Check if user exists and password is correct
    const isExist = await User.findOne({ email: email });

    if (!isExist) {
        const error = new CustomErrorHandler('Invalid email', 400);
        return next(error);
    }

    
    // Generate a random number between 0 and 9999
    const randomNumber = Math.floor(Math.random() * 10000);
    
    // Pad the number with leading zeros if necessary
    const fourDigitNumber = randomNumber.toString().padStart(4, '0');
    
    const pin = fourDigitNumber;

    sendEmail({ to: email, pin: pin });

    res.status(200).json({
        status: 'success',
        data: {
            pin
        }
    });
});

// POST Request for user issue 
exports.userIssue = AsyncErrorHandler(async (req, res, next) => {
    const { email, msg } = req.body;

    getEmail({ from: email, bodyMsg: msg });

    res.status(200).json({
        status: 'success',
    });
});