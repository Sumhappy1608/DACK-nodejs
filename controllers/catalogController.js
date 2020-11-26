const bookModel = require('../models/bookModel');
const books = bookModel.list();

exports.index = (req, res, next) => {
    res.render('books/catalog', {books});
}