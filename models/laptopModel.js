const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const laptopsCollection = db().collection("laptops");
    const laptops = await laptopsCollection.find({delete_flag: false}).toArray();
    //console.log(books);
    //console.dir(laptops);
    return laptops;
}

exports.get = async (id) => {
    const laptopCollection = db().collection('laptops');
    
    let laptop = await laptopCollection.findOne({_id: ObjectId(id)});
    await laptopCollection.updateOne({_id: ObjectId(id)}, {$set: {view: laptop.view + 1}});
    laptop = await laptopCollection.findOne({_id: ObjectId(id)});
    return laptop;
}

/*Search By Name*/
exports.searchName = async(page, nameV, typeV, brandV) => {
    const laptopCollection = db().collection('laptops');
    let perPage = 5;
    let Page = +page || 1;
    let pages;
    let laptops;
    if (brandV == null)
    {
        brandV = '';
    }
    if (typeV == null)
    {
        typeV = '';
    }

    if(nameV){
        pages = Math.ceil(await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}, delete_flag: false}).count() / perPage);
        laptops = await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}, delete_flag: false}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else if (!nameV && (brandV || typeV))
    {
        pages = Math.ceil(await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}, delete_flag: false}).count() / perPage);
        laptops = await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}, delete_flag: false}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else{
        pages = Math.ceil(await laptopCollection.find({delete_flag: false}).count() / perPage);
        laptops = await laptopCollection.find({delete_flag: false}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    
    const prev = Page > 1;
    const first = Page > 2;
    const prevPage = Page - 1;
    const nextPage = Page + 1;
    const next = Page < pages;
    const last = Page < (pages - 1);

    const ret = {laptops: laptops, first:first, prev: prev, prevPage:prevPage, Page: Page, nextPage: nextPage, next: next, last: last, pages:pages}
    return ret;
}