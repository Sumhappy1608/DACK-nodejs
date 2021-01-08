const { ObjectID } = require('mongodb');
const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const checkoutModel = require('../models/checkoutModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    const delivery = await checkoutModel.selectDelivery();
    const payment = await checkoutModel.selectPayment();
    const address = await checkoutModel.selectDeliveryAddress(req.user);
    console.log(address);
    if(req.user != undefined || req.user != null)
    {
        res.render('checkout', {delivery,payment, address});
    }
    else
    {
        res.render('checkout', {delivery,payment});
    }
}