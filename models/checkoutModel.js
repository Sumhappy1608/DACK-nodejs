const {db} = require('../database/db');
const { ObjectID} = require('mongodb');

exports.selectPayment = async() => {
    const paymentCollection = db().collection("payment");
    const payment = await paymentCollection.find({}).toArray();
    return payment;
}

exports.selectOnePayment = async(id) => {
    const paymentCollection = db().collection("payment");
    const payment = await paymentCollection.findOne({_id: ObjectID(id)});;
    return payment;
}

exports.selectDelivery = async() => {
    const deliveryCollection = db().collection("delivery");
    const delivery = await deliveryCollection.find({}).toArray();
    return delivery;
}

exports.selectOneDelivery = async(id) => {
    const deliveryCollection = db().collection("delivery");
    const delivery = await deliveryCollection.findOne({_id:ObjectID(id)});
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

exports.selectTotal = async(user) => {
    const cartCollection = db().collection("cart");
    const cart = await cartCollection.findOne({"id_user": ObjectID(user._id),"isCheckout":false});
    return cart.total;
}

exports.confirmOrder = async(id_delivery, id_payment, address, user, remark) => {
    const cartCollection = db().collection("cart");
    const checkoutCollection = db().collection("checkout");

    const cart = await cartCollection.findOne({"id_user": ObjectID(user._id),"isCheckout":false});

    if(cart != undefined)
    {
        const order = {
            "remark": remark,
            "billing_address": address,
            "id_cart": cart._id,
            "id_voucher": "none",
            "id_delivery": ObjectID(id_delivery),
            "id_payment": ObjectID(id_payment),
            "total_sum": cart.total,
            "status": "đã nhận đơn hàng"
        }
        const checkout = await checkoutCollection.insertOne(order);
    }
}


exports.selectOneCart = async(user) => {
    const cartCollection = db().collection("cart");
    const cart = await cartCollection.findOne({"id_user": ObjectID(user._id),"isCheckout":false});
    return cart;
}


exports.selectOneCheckout = async(user) => {
    const checkoutCollection = db().collection("checkout");
    const checkout = await checkoutCollection.findOne({"id_user": ObjectID(user._id)});
    return checkout;
}

