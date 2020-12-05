const laptopModel = require('../models/laptopModel');
exports.index = async (req, res, next) => {
    const laptops = await laptopModel.list();
    res.render('books/catalog', {laptops});
}

exports.paginate = async (req, res, next) => {
    const laptops = await laptopModel.getPerPage(req.params.page);
    res.render('books/catalog', {laptops});
}