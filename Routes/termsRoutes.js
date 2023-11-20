const express = require('express');
const termsController = require('../Controller/termsController');


const router = express.Router();

// Add terms data
router.route('/addTerms').post(termsController.addTerms);

// Get terms data
router.route('/getTerms').get(termsController.getTerms);


module.exports = router;