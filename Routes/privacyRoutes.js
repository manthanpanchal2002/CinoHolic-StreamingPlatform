const express = require('express');
const privacyController = require('../Controller/privacyController');

const router = express.Router();

// Add privacy data
router.route('/addPrivacy').post(privacyController.addPrivacy);

// Get privacy data
router.route('/getPrivacy').get(privacyController.getPrivacy);

module.exports = router;