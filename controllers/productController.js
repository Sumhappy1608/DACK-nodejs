const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const commentModel = require('../models/commentModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    let comments = await commentModel.listComment(laptop._id, 1);
    if(req.user != undefined)
    { 
        //console.log(req.session.cart);
        if(req.session.cart.length != 0)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        {
            await cartModel.addProduct_user(req.session.cart,req.user);
        }
        const products_cart = await cartModel.selectProduct(req.user);
        res.render('books/product', {laptop: laptop, comment: comments.comments, pages: comments.totalPages, products: products_cart.products});
    }
    else
    {
        res.render('books/product', {laptop: laptop, comment: comments.comments, pages: comments.totalPages});
    }
}

exports.comment = async (req, res, next) => {
    await commentModel.addComment(req.query.product, req.body.comment, req.user.user.username);
    res.redirect('/product?product=' + req.query.product);
}