const userModel = require('../models/userModel');
var passwordHash = require('password-hash');

exports.sendform = (req, res, next) => {
    res.render('signup.hbs', null);
}

exports.registration = (req, res, next) => {
    let username = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let password = req.body.password;
    let password_hashed = passwordHash.generate(password);
    const user = {
        username: username,
        phone: phone,
        email: email,
        password: password_hashed
    }
    userModel.registration(user);
    res.redirect('/login');
}