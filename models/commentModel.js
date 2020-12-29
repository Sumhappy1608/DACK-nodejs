const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const { ObjectID } = require('mongodb');

exports.listComment = async (id, page) => {
    const commentCollection = db().collection("comments");
    let perPage = 3;
    let pages =  Math.ceil(await commentCollection.find({id_product: id}).count() / perPage);
    let comments = await commentCollection.find({id_product: id}).sort({_id:-1}).skip((page - 1) * perPage).limit(perPage).toArray();
    let ObRet = {
        comments: comments,
        totalPages: pages
    }
    return ObRet;
}

exports.addComment = async (id, text, username) => {
    const commentCollection = db().collection("comments");
    var d = new Date();
    let date = (+d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    let comment = {
        id_product: ObjectID(id),
        date: date,
        text: text,
        username: username
    }
    await commentCollection.insertOne(comment);
    return 1;
}