const laptopModel = require('../models/laptopModel');
exports.index = async (req, res, next) => {
    const laptops = await laptopModel.list();
    res.render('books/catalog', {laptops});
}

exports.paginate = async (req, res, next) => {
    let brand = req.query.laptop_brand;
    console.log("brand="+brand);
    let type = req.query.laptop_type;
    console.log("type="+type);
    console.log("page="+req.query.page);
    console.log("name="+req.query.searchName);
    const returnObject = await laptopModel.getPerPage(req.query.page);
    console.log(returnObject);
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

/*exports.searchbyName = async (req, res, next) => {
    var brand = req.query.laptop_brand;
    var type = req.query.laptop_type;
    if (brand == "All brands")
    {
        brand = '';
    }
    console.log("page="+req.query.page);
    console.log("name="+req.query.searchName);
    console.log("brand="+brand);
    console.log("type="+type);

    const returnObject = await laptopModel.searchName(req.query.page, req.query.searchName, type, brand);
    res.render('laptops/product', {laptops: returnObject.laptops,
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
}*/
