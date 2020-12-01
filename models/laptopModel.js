const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const laptopsCollection = db().collection("laptops");
    const laptops = await laptopsCollection.find({}).toArray();
    //console.log(books);
    console.dir(laptops);
    return laptops;
}

exports.get = async (id) => {
    const laptopCollection = db().collection('laptops');
    const laptop = await laptopCollection.findOne({_id: ObjectId(id)})
    return laptop;
}