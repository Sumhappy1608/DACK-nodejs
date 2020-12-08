const laptopModel = require('../models/laptopModel');
exports.index = async (req, res, next) => {
    const laptops = await laptopModel.list();
    res.render('books/catalog', {laptops});
}

exports.paginate = async (req, res, next) => {
    let brand = req.query.laptop_brand;
    let type = req.query.laptop_type;
    let name = req.query.searchName;
    const returnObject = await laptopModel.getPerPage(req.query.page, name, type, brand);
    res.render('books/catalog', {laptops: returnObject.laptops,
        first: returnObject.first,
        prev: returnObject.prev,
        prevPage: returnObject.prevPage,
        page: returnObject.Page,
        next: returnObject.next,
        nextPage: returnObject.nextPage,
        last: returnObject.last,
        pages: returnObject.pages});
}

