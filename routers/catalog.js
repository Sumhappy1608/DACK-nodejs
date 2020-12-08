const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const catalog = catalogController.index;

router.get('/', catalogController.paginate);

//router.get('/:page', catalogController.paginate);
router.get('/search-action', (req, res) => {
    res.redirect('/catalog/?page=' + req.query.page + '&searchName=' + req.query.searchName +'&laptop_type=' + req.query.laptop_type + '&laptop_brand=' + req.query.laptop_brand);
});

router.get('/product', (req, res) => {
    let id = req.query.product;
    res.redirect('/product/?product=' + id);
});


module.exports = router;