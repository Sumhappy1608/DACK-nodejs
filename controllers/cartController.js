const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const cartItem = [];
exports.AddToCardCatalog = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    const laptops = await laptopModel.list();
    cartItem.push(laptop);
    const cart = req.session.cart = cartItem;
    console.log(req.session.user);
    res.redirect("/catalog");
}

exports.AddToCardProduct = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    const laptops = await laptopModel.list();
    cartItem.push(laptop);
    const cart = req.session.cart = cartItem;
    res.redirect('/product?product=' + req.query.product);
}
