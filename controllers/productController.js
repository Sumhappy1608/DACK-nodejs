const bookModel = require('../models/bookModel');
const books = bookModel.list();

exports.index = (req, res, next) => {
    let id = req.query.product;
    let book = books.find(x => x.id == id);
    res.render('books/product', {book});
}
