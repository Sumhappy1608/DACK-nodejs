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

//nếu trong session có hàng hóa thì sau khi đăng nhập thêm vào giỏ hàng
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

exports.addProduct_user = async(cart, user) => {
    const cartCollection = db().collection("cart");
    cartCollection.updateOne(
        { "id_user": ObjectID(user._id)},
        {
            $addToSet: {
                "products": {$each : cart}
            }
        }
    );
}

exports.selectProduct = async(user) => {
    const cartCollection = db().collection("cart");
    const products_cart = await cartCollection.findOne({"id_user": ObjectID(user._id)});
    //console.log(products_cart);
    return products_cart;
}

exports.updateTotal = async(user) =>{
    const cartCollection = db().collection("cart");
    const products_cart = await cartCollection.findOne({"id_user": ObjectID(user._id), "isCheckout": "0"});
    console.log(products_cart.products.length);
    let sum = 0;
    for (const product of products_cart.products) {  
        sum += parseFloat(product.price);
    }
    sum = sum.toString();  //đổi số thành chuỗi
    console.log(sum);

    await cartCollection.updateOne({"id_user": ObjectID(user._id), "isCheckout": "0"}, {$set: {"total":sum}});
}

exports.deleteProduct = async(id_product,user) =>{
    console.log(user._id);
    console.log(id_product);
    //"products": [{"_id":ObjectID(id_product)}]
    await cartCollection.updateOne({"id_user": user._id}, {$pull:{"products":{$elemMatch:{"_id":ObjectID(id_product)}}}});
}