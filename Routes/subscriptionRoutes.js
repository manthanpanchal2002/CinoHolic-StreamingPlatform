const express = require('express');
const subscriptionController = require('../Controller/subscriptionController');


const router = express.Router();

// Add terms data
router.route('/addSubscription').post(subscriptionController.addSubscription);

// Get terms data
router.route('/getSubscription').get(subscriptionController.getSubscription);


module.exports = router;