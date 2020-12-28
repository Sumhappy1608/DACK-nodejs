const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const product = productController.index;

router.get('/', product);

router.get('/back', (req, res) => {
    res.redirect('/');
});

router.post('/comment', (req, res) => {
    var d = new Date();
    let month = d.getMonth() + 1;
    console.log(d.getFullYear() + '/' + (+d.getMonth() + 1) + '/' + d.getDate());
    res.redirect('/product?product=' + req.query.product);
});

module.exports = router;