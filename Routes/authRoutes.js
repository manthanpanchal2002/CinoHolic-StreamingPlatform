const express = require('express');
const authController = require('./../Controller/authController');

const router = express.Router();

// Sign-Up route
router.route('/sign-up').post(authController.signUp);

// Sign-In route
router.route('/sign-in').post(authController.signIn);

// Get User Details with Email ID
router.route('/UserDetails/:email').get(authController.UserDetailsWithEmailID);

// Update User Data
router.route('/UpdateUserData/:email').patch(authController.UpdateUserData);

// Forgot Password
router.route('/forgotPassword').post(authController.forgotPassword);

// User issue
router.route('/userIssue').post(authController.userIssue);

module.exports = router;