const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const passport = require('../passport');
const cartItem = [];

exports.AddToCardCatalog = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    cartItem.push(laptop);
    const cart = req.session.cart = cartItem;  //bỏ hàng hóa vào trong session

    if(req.user != undefined) {
        if(cart.length != 0)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        {
            await cartModel.addProduct_Session(cart,req.user._id);
        }
        await cartModel.addProduct(laptop,req.user._id);
    }
    res.redirect('back');  //trả lại trang hiện có
}

exports.AddToCardProduct = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    cartItem.push(laptop);
    const cart = req.session.cart = cartItem;

    if(req.user != undefined) {
        if(cart.length != 0)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        {
            await cartModel.addProduct_Session(cart,req.user._id);
        }
        await cartModel.addProduct(laptop,req.user._id);
    }

    //res.redirect('/product?product=' + req.query.product);
    res.redirect('back');  //trả lại trang hiện có
}


