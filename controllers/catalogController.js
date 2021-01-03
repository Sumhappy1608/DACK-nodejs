const cartModel = require('../models/cartModel');
const laptopModel = require('../models/laptopModel');
const passport = require('../passport');

exports.index = async (req, res, next) => {
    const laptops = await laptopModel.list();  
    res.render('books/catalog', {laptops});
}
exports.searchbyName = async (req, res, next) => {
    var brand = req.query.laptop_brand;
    var type = req.query.laptop_type;
    if (brand == "All Brand" || brand == "Brand")
    {
        brand = '';
    }
    if (type == "All Type" || type == "Type")
    {
        type = '';
    }
    const returnObject = await laptopModel.searchName(req.query.page, req.query.searchName, type, brand);
    //console.log(req.user);
    if(req.user != undefined)
    { 
        //console.log(req.session.cart);
        if(req.session.cart != undefined)  //có hàng hóa trong session => trước khi đăng nhập đã có hàng hóa sẵn
        {
            await cartModel.addProduct_user(req.session.cart,req.user);
        }
        await cartModel.updateTotal(req.user);
        const products_cart = await cartModel.selectProduct(req.user);
        res.render('books/catalog', {laptops: returnObject.laptops,
            first: returnObject.first,
            prev: returnObject.prev,
            prevPage: returnObject.prevPage,
            page: returnObject.Page,
            next: returnObject.next,
            nextPage: returnObject.nextPage,
            last: returnObject.last,
            pages: returnObject.pages,
            searchName: req.query.searchName,
            laptop_type: type,
            laptop_brand: brand,
            products: products_cart.products,
            total: products_cart.total
        });
    }
    else
    {
        res.render('books/catalog', {laptops: returnObject.laptops,
            first: returnObject.first,
            prev: returnObject.prev,
            prevPage: returnObject.prevPage,
            page: returnObject.Page,
            next: returnObject.next,
            nextPage: returnObject.nextPage,
            last: returnObject.last,
            pages: returnObject.pages,
            searchName: req.query.searchName,
            laptop_type: type,
            laptop_brand: brand});
    }
}
