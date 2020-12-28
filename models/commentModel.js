const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const { ObjectID } = require('mongodb');

exports.listComment = async (id) => {
    const commentCollection = db().collection("comments");
    let comments = await commentCollection.find({id_product: id}).toArray();
    comments.reverse();
    return comments;
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