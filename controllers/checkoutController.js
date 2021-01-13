const { ObjectID } = require('mongodb');
const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const checkoutModel = require('../models/checkoutModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    const delivery = await checkoutModel.selectDelivery();
    const payment = await checkoutModel.selectPayment();
    if(req.user != undefined || req.user != null)
    {
        const address = await checkoutModel.selectDeliveryAddress(req.user);
        const total = await checkoutModel.selectTotal(req.user);
        res.render('checkout', {delivery,payment, address,total});
    }
    else
    {
        //res.render('checkout', {delivery,payment});
        res.redirect("/login");
    }
}

exports.confirm = async (req, res, next) => {
    console.log(req.query.delivery);  // ID Delivery
    console.log(req.query.payment);   // ID Payment
    res.redirect('/checkout');
}