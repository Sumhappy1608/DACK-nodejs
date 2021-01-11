const { ObjectID } = require('mongodb');
const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const checkoutModel = require('../models/checkoutModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    const delivery = await checkoutModel.selectDelivery();
    const payment = await checkoutModel.selectPayment();
    console.log(req.user);
    if(req.user != undefined || req.user != null)
    {
        const address = await checkoutModel.selectDeliveryAddress(req.user);
        res.render('checkout', {delivery,payment, address});
    }
    else
    {
        //res.render('checkout', {delivery,payment});
        res.redirect("/login");
    }
}