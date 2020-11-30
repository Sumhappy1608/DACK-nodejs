const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.list = async () => {
    const booksCollection = db().collection("books");
    const books = await booksCollection.find({}).toArray();
    //console.log(books);
    console.dir(books);
    return books;
}

exports.get = async (id) => {
    const booksCollection = db().collection('books');
    const book = await booksCollection.findOne({_id: ObjectId(id)})
    return book;
}