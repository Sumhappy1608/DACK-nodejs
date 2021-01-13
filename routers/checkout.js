const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const checkout = checkoutController.index;

router.get('/', checkout);

router.get('/confirm', checkoutController.confirm);

module.exports = router;