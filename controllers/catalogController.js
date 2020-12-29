const laptopModel = require('../models/laptopModel');

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
