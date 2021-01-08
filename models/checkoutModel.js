const {db} = require('../database/db');
const { ObjectID} = require('mongodb');

exports.selectPayment = async() => {
    const paymentCollection = db().collection("payment");
    const payment = await paymentCollection.find({}).toArray();
    return payment;
}

exports.selectDelivery = async() => {
    const deliveryCollection = db().collection("delivery");
    const delivery = await deliveryCollection.find({}).toArray();
    return delivery;
}

exports.selectDeliveryAddress = async(user) => {
    const userCollection = db().collection("user");
    const add = await userCollection.findOne({"_id": ObjectID(user._id)});
    const a = [];
    if (user._id != null || user._id != undefined) {
        if (add.address != null || add.address != undefined) {
            for (const addr of add.address) {
                const temp = {
                    name: add.user.username,
                    address: addr
                };
                a.push(temp);
            }
        }
    }
    return a;
}