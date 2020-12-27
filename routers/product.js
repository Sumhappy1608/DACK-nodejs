const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const product = productController.index;

router.get('/', product);

router.get('/back', (req, res) => {
    res.redirect('/');
});

router.post('/comment', (req, res) => {
    console.log(req.body.comment);
    res.redirect('/product?product=' + req.query.product);
});

module.exports = router;