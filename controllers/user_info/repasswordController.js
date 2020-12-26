const e = require('express');
const userModel = require('../../models/userModel');

exports.sendform = (req, res, next) => {
    res.render('user/re-password.hbs', null);
}


exports.changePassword = (req, res, next) => {
    if(userModel.changePassword(req.body.old_password, req.body.password, req.user)){
        res.redirect('/user?change-success');
    }
    else{
        res.redirect('/re-password?wrong-password');
    }
}