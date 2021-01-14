const {db} = require('../database/db');
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
        isCheckout: false,
        total: "0"
    }
    // console.log(id_user);
    // console.log(cart);
    if(!cart || cart.isCheckout == "1")
    {
       //console.log("chưa có giỏ hàng");
        cartCollection.insertOne(cartNewRecord, function (err,res) {
            //console.log('Them thanh cong');
        });
    }
    else
    {
        //console.log("đã có giỏ hàng");
        cartCollection.updateOne(
            { "id_user": ObjectID(id_user)},
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

exports.addProduct_user = async(product, user) => {

    const cartCollection = db().collection("cart");
    const cart = await cartCollection.findOne({"id_user": ObjectID(user._id)});
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
        id_user: user._id,
        isCheckout: false,
        total: "0"
    }
    
    if(!cart || cart.isCheckout == true)
    {
        //console.log("chưa có giỏ hàng");
        cartCollection.insertOne(cartNewRecord, function (err,res) {
            //console.log('Them thanh cong');
        });
    }
    else
    {
        //console.log("đã có giỏ hàng");
        cartCollection.updateOne(
            { "id_user": ObjectID(user._id)},
            {
                $addToSet: {
                    "products": product
                }
            }
        );
    }
}

exports.selectProduct = async(user) => {
    const cartCollection = db().collection("cart");
    const products_cart = await cartCollection.findOne({"id_user": ObjectID(user._id)});
    //console.log(products_cart);
    return products_cart;
}

exports.updateTotal = async(user) =>{
    const cartCollection = db().collection("cart");
    const products_cart = await cartCollection.findOne({"id_user": ObjectID(user._id), "isCheckout": false});
    console.log(products_cart.products);
    let sum = 0;
    if(products_cart.products != null || products_cart.products != undefined)
    {
        for (const product of products_cart.products) {  
            sum += parseFloat(product.price);
        }
        sum = sum * 1000000;
        sum = sum.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,');;  //đổi số thành chuỗi
        await cartCollection.updateOne({"id_user": ObjectID(user._id), "isCheckout": false}, {$set: {"total":sum}});
    }
    //console.log(sum);
}

exports.deleteProduct = async(id_product,user) =>{
    const cartCollection = db().collection("cart");
    //Viết hàm xóa sản phẩm vừa lấy khỏi session
    await cartCollection.updateOne(
        { "id_user":ObjectID(user._id) },
        { $pull: { products: { _id: ObjectID(id_product) } } }
      );
}

exports.UpdateIsCheckout = async(id_cart) =>{
    const cartCollection = db().collection("cart");
    //Viết hàm xóa sản phẩm vừa lấy khỏi session
    await cartCollection.updateOne({"_id": ObjectID(id_cart), "isCheckout": false}, {$set: {"isCheckout": true}});
}

