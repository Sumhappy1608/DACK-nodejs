const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const { ObjectID} = require('mongodb');

exports.addProduct = async(product, id_user) => {
    const cartCollection = db().collection("cart");
    const cart = await cartCollection.findOne({"id_user": ObjectID(id_user)});
    const cartNewRecord = {
        products:[{
            _id: product._id,
            name: product.name,
            cpu: product.cpu,
            image: product.image,
            ram: product.ram,
            monitor: product.monitor,
            vga: product.vga,
            memory: product.memory,
            detail: product.detail,
            price: product.price,
            brand: product.brand,
            delete_flag: product.delete_flag,
            type: product.type
        }],
        id_user: id_user,
        isCheckout: "0",
        total: "0"
    }
    // console.log(id_user);
    // console.log(cart);
    if(!cart || cart.isCheckout == "1")
    {
        console.log("chưa có giỏ hàng");
        cartCollection.insertOne(cartNewRecord, function (err,res) {
            console.log('Them thanh cong');
        });
    }
    else
    {
        console.log("đã có giỏ hàng");
        cartCollection.updateOne(
            { "id_user":  ObjectID(id_user)},
            {
                $addToSet: {
                    "products": product
                }
            }
        );
    }
}

exports.addProduct_Session = async(cart, id_user) => {
    const cartCollection = db().collection("cart");
    cartCollection.updateOne(
        { "id_user": ObjectID(id_user)},
        {
            $addToSet: {
                "products": {$each : cart}
            }
        }
    );
}

exports.selectProduct = async(user) => {
    const cartCollection = db().collection("cart");
    const products_cart = cartCollection.findOne({"id_user": user._id});
    return products_cart;
}