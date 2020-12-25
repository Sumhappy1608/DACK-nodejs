const userModel = require('../../models/userModel');

exports.updateEmailPhoneAndImage = (req, res, next) => {
    req.user.user.email = req.body.email;
    req.user.user.phone = req.body.phone;
    req.user.user.image = req.body.image;
    let temp = req.user;
    userModel.updateEmailPhoneAndImage(temp);
    res.redirect('/user');
}