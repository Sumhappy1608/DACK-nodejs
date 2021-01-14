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
    // console.log(req.query.delivery);  // ID Delivery
    // console.log(req.query.payment);   // ID Payment
    // console.log(req.query.address);  

    const temp = (req.query.building + " building " + req.query.street + " street " + req.query.city + " city " + req.query.country + ", " + req.query.zip).toString();
    // console.log(temp);
    if(temp != undefined)
    {
        var addr = temp;
    }
    else if(req.query.address != undefined){
        var addr = req.query.address;
    }
    
    if(req.query.delivery !=undefined && req.query.payment!=undefined && addr!=undefined && req.user)
    {
        await checkoutModel.confirmOrder(req.query.delivery, req.query.payment, addr, req.user, req.query.remark);
        const delivery = await checkoutModel.selectOneDelivery(req.query.delivery);
        const payment = await checkoutModel.selectOnePayment(req.query.payment);
        const cart = await checkoutModel.selectOneCart(req.user);
        res.render('checkout_success', { delivery: delivery.name, payment: payment.name, address: addr, total: cart.total, remark: req.query.remark });
    }
    else
    {
        res.render('checkout_fail');
    }

    // const checkout = await checkoutModel.selectOneCheckout(req.user);
    // if(checkout != undefined)
    // {
    //     const delivery = await checkoutModel.selectOneDelivery(checkout.id_delivery);
    //     const payment = await checkoutModel.selectOnePayment(checkout.id_payment);
    //     const cart = await checkoutModel.selectOneCart(checkout.id_user);
    //     res.render('checkout_success',{delivery: delivery.name, payment: payment.name, address: req.query.address, total: cart.total,remark:checkout.remark});
    // } 
}

