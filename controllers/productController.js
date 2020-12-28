const laptopModel = require('../models/laptopModel');
const commentModel = require('../models/commentModel');

exports.index = async (req, res, next) => {
    let id = req.query.product;
    let laptop = await laptopModel.get(id);
    let comments = await commentModel.listComment(laptop._id);
    res.render('books/product', {laptop: laptop, comment: comments});
}

exports.comment = async (req, res, next) => {
    
}