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

exports.getPerPage = async (page) => {
    const laptopCollection = db().collection('laptops');
    let perPage = 5;
    let Page = +page || 1;

    // const temp = await laptopCollection.find({}).toArray();
    // console.log(temp);
    const pages = Math.ceil(await laptopCollection.find({}).count() / perPage);
    console.log(pages);

    const laptops = await laptopCollection.find({}) // find tất cả các data
    .skip((perPage * Page) - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
    .limit(perPage).toArray();

    const prev = Page > 1;
    const first = Page > 2;
    const prevPage = Page - 1;
    const nextPage = Page + 1;
    const next = Page < pages;
    const last = Page < (pages - 1);

    const ret = {laptops: laptops, first:first, prev: prev, prevPage:prevPage, Page: Page, nextPage: nextPage, next: next, last: last, pages:pages}
    return ret;
};

