const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const product = productController.index;

router.get('/', product);

router.get('/back', (req, res) => {
    res.redirect('/');
});

module.exports = router;