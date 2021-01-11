const { ObjectID } = require('mongodb');
const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const passport = require('../passport');
const cartItem = [];

exports.AddToCardCatalog = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
   
    if(req.user != undefined) {
        // if(cart.length != 0)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        // {
        //     await cartModel.addProduct_Session(cart,req.user._id);
        // }
        await cartModel.addProduct(laptop,req.user._id);
    }
    else
    {
        cartItem.push(laptop);
        const cart = req.session.cart = cartItem;  //bỏ hàng hóa vào trong session
        req.session.amount = req.session.cart.length;
        
        //Tính tổng tiền
        let total_session = 0;
        for(const product of req.session.cart)
        {
            total_session = total_session + parseFloat(product.price);
        }
        total_session = total_session * 1000000;
        req.session.total = total_session;
        console.log(req.session.total);
    }
    res.redirect('back');  //trả lại trang hiện có
}

exports.AddToCardProduct = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    
    if(req.user != undefined) {
        // if(cart.length != 0)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        // {
        //     await cartModel.addProduct_Session(cart,req.user._id);
        // }
        await cartModel.addProduct(laptop,req.user._id);
    }
    else
    {
        cartItem.push(laptop);
        const cart = req.session.cart = cartItem;
        req.session.amount = req.session.cart.length;
        //Tính tổng tiền
        let total_session = 0;
        for(const product of req.session.cart)
        {
            total_session = total_session + parseFloat(product.price);
        }
        total_session = total_session *1000000;
        req.session.total = total_session;
        console.log(req.session.total);

    }
    //res.redirect('/product?product=' + req.query.product);
    res.redirect('back');  //trả lại trang hiện có
}

exports.removeProduct = async (req, res, next) => {
    const id = req.query.id_product;
    if(req.user != undefined)
    {
        await cartModel.deleteProduct(id,req.user);
    }
    else
    {
        let i = 0;
        for(const product of req.session.cart)
        {
            if(product._id == ObjectID(id))
            {
                req.session.cart.splice(i,1);
            }
            i = i + 1;
        }
        req.session.amount = req.session.cart.length;
        //Tính tổng tiền
        let total_session = 0;
        for(const product of req.session.cart)
        {
            product.price = parseFloat(product.price);
            total_session = total_session + product.price;
        }
        req.session.total = total_session;
        console.log(req.session.total);
    }
    res.redirect('back');  //trả lại trang hiện có
} 

