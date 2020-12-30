const {db} = require('../database/db');
const { ObjectId} = require('mongodb');
const passport = require('passport');
const passwordHash = require('password-hash');
const { Passport } = require('passport');
var generator = require('generate-password');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kryptograph0000@gmail.com',
      pass: 'genshinimpact'
    }
  });


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
    const userCollection = db().collection("user");
    await userCollection.updateOne({_id: user._id}, {$set: {user: user.user}});
    return 1;
}

exports.changePassword = async (old_pass, new_pass, old_pass_check) => {
    if(passwordHash.verify(old_pass, old_pass_check.user.password))
    {
        let password = passwordHash.generate(new_pass);
        old_pass_check.user.password = password;
        const userCollection = db().collection("user");
        await userCollection.updateOne({_id: old_pass_check._id}, {$set: {user: old_pass_check.user}});
        return true;
    }
    return false;
}

exports.recoverPassword = async (username) => {
    let newPass = generator.generate({
        length: 10,
        numbers: true
    });

    const userCollection = db().collection("user");
    await userCollection.updateOne({"user.username": username}, {$set: {"user.password": passwordHash.generate(newPass)}});
    let user = await userCollection.findOne({"user.username" : username});


    let mailOption = {
        from: 'kryptograph0000@gmail.com',
        to: user.user.email,
        subject: 'Recover password',
        text: 'Your new password for ' + username + ' is ' + newPass
    }
    transporter.sendMail(mailOption, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}