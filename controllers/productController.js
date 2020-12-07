const laptopModel = require('../models/laptopModel');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    console.log(laptop);
    res.render('books/product', {laptop});
}

