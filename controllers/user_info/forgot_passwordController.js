const userModel = require('../../models/userModel');

exports.sendform = (req, res, next) => {
    res.render('user/forgot_password.hbs', null);
}

exports.changePassAndSendEmail = (req, res, next) => {
    let username = req.body.input_username;
    userModel.recoverPassword(username);
    res.redirect('/login');
}