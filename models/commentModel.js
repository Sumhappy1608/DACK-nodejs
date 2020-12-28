const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.listComment = async (id) => {
    const commentCollection = db().collection("comments");
    const comments = await commentCollection.find({id_product: id}).toArray();
    return comments;
}