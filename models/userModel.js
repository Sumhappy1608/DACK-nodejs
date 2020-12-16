const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const passport = require('passport');
var passwordHash = require('password-hash');


exports.registration = async(user) => {
    const user_data = {
        user: user,
        isLock: 0,
        buy_id: ""
    }
    const userDatabase = db().collection('user');
    await userDatabase.insert(user_data);
    return 1;
}

exports.checkCredential = async(username, password) => {
    const userCollection = db().collection("user");
    const account = await userCollection.findOne({"user.username" : username});
    if(!account)   //Nếu không có user
    {
        return false;
    }

    const pass = await userCollection.find({"user.username" : username}, {"user.password": 1, _id: 0}).toArray();
    //const verifyHash = passwordHash.verify(password, pass);

    if(pass)
    {
        return account;
    }

    return false;
}

exports.getUser = (id) =>{
    const userCollection = db().collection("user");
    const user = userCollection.findOne({_id:id});
    return user;
}