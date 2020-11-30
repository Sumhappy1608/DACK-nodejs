const bookModel = require('../models/bookModel');
exports.index = async (req, res, next) => {
    const books = await bookModel.list();
    res.render('books/catalog', {books});
}