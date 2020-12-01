const bookModel = require('../models/bookModel');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let book = await bookModel.get(id);
    console.log(book);
    res.render('books/product', {book});
}
