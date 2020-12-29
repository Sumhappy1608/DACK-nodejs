var express = require('express');
var router = express.Router();
const cartController = require('../controllers/cartController');
//const product = cartController.product;

router.get('/catalog', cartController.AddToCardCatalog);

router.get('/product', cartController.AddToCardProduct);

module.exports = router;