const laptopModel = require('../models/laptopModel');
const commentModel = require('../models/commentModel');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    let comments = await commentModel.listComment(laptop._id, 1);
    res.render('books/product', {laptop: laptop, comment: comments.comments, pages: comments.totalPages});
}

exports.comment = async (req, res, next) => {
    await commentModel.addComment(req.query.product, req.body.comment, req.user.user.username);
    res.redirect('/product?product=' + req.query.product);
}