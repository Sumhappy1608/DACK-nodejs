const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const passport = require('passport');
var passwordHash = require('password-hash');
const { Passport } = require('passport');


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
    const verifyHash = passwordHash.verify(password, account.user.password);

    if(verifyHash)
    {
        return account;
    }

    return false;
}

exports.getUser = async (id) => {
    const userCollection = db().collection("user");
    const user = await userCollection.findOne({"_id":ObjectId(id)});
    return user;
}

exports.isUsernameExist = async (username) => {
    const userCollection = db().collection("user");
    const account = await userCollection.findOne({"user.username" : username});
    
    if(!account)   //Nếu không có user
    {
        return false;
    }

    return true;
}

exports.updateEmailPhoneAndImage = async (user) => {
    console.log(user);
    const userCollection = db().collection("user");
    await userCollection.updateOne({_id: user._id}, {$set: {user: user.user}});
    return 1;
}