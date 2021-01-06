const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const commentModel = require('../models/commentModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    let comments = await commentModel.listComment(laptop._id, 1);
    
    if(req.user != undefined )
    { 
        if (req.session.cart != undefined)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        {
            //await cartModel.addProduct_user(req.session.cart, req.user);
            for( const product of req.session.cart)
            {
                const temp = {
                    _id: ObjectID(product._id),
                    name: product.name,
                    cpu: product.cpu,
                    image: product.image,
                    ram: product.ram,
                    monitor: product.monitor,
                    vga: product.vga,
                    memory: product.memory,
                    detail: product.detail,
                    price: product.price,
                    brand: product.brand,
                    delete_flag: product.delete_flag,
                    type: product.type,
                    view: product.view
                }
                console.log(temp._id);
                await cartModel.addProduct_user(temp,req.user);
            }
        }
        await cartModel.updateTotal(req.user);
        const products_cart = await cartModel.selectProduct(req.user);
        if(products_cart != null || products_cart != undefined)
        {
            if (products_cart.products != null || products_cart.products != undefined) {

                res.render('books/product',
                    {
                        laptop: laptop,
                        comment: comments.comments,
                        pages: comments.totalPages,
                        products: products_cart.products,
                        total: products_cart.total
                    });
            }
        }
        else
        {
            res.render('books/product', {laptop: laptop, comment: comments.comments, pages: comments.totalPages});
        }
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