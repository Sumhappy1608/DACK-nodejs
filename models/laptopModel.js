const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const laptopsCollection = db().collection("laptops");
    const laptops = await laptopsCollection.find({}).toArray();
    //console.log(books);
    //console.dir(laptops);
    return laptops;
}

exports.get = async (id) => {
    const laptopCollection = db().collection('laptops');
    const laptop = await laptopCollection.findOne({_id: ObjectId(id)})
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
        pages = Math.ceil(await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}).count() / perPage);
        laptops = await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else if (!nameV && (brandV || typeV))
    {
        pages = Math.ceil(await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}).count() / perPage);
        laptops = await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else{
        pages = Math.ceil(await laptopCollection.find({}).count() / perPage);
        laptops = await laptopCollection.find({}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    
    console.log(laptops);
    console.log("here");
    
    const prev = Page > 1;
    const first = Page > 2;
    const prevPage = Page - 1;
    const nextPage = Page + 1;
    const next = Page < pages;
    const last = Page < (pages - 1);

    const ret = {laptops: laptops, first:first, prev: prev, prevPage:prevPage, Page: Page, nextPage: nextPage, next: next, last: last, pages:pages}
    return ret;
}

/*Search By Name*/
/*exports.searchName = async(page, nameV, typeV, brandV) => {
    const laptopCollection = db().collection('laptops');
    // const laptop = await laptopCollection.findOne({name: name});
    // return laptop;
    // const laptops = await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}}).toArray();
    let perPage = 5;
    let Page = +page || 1;
    let pages;
    let laptops
    // if(nameV){
    //     pages = Math.ceil(await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}}).count() / perPage);
    //     laptops = await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}}) // find tất cả các data
    //     .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    //     .limit(perPage).toArray();
    // }
    // else{
    //     pages = Math.ceil(await laptopCollection.find({}).count() / perPage);

    //     laptops = await laptopCollection.find({}) // find tất cả các data
    //     .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    //     .limit(perPage).toArray();
    // }

    if(nameV){
        pages = Math.ceil(await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}).count() / perPage);
        laptops = await laptopCollection.find({name: {$regex : ".*" + nameV + ".*"}, type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else if (!nameV && (brandV || typeV))
    {
        pages = Math.ceil(await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}).count() / perPage);
        laptops = await laptopCollection.find({type: {$regex : ".*" + typeV + ".*"}, brand: {$regex : ".*" + brandV + ".*"}}) // find tất cả các data
        .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
        .limit(perPage).toArray();
    }
    else{
        pages = Math.ceil(await laptopCollection.find({}).count() / perPage);

        laptops = await laptopCollection.find({}) // find tất cả các data
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
}*/