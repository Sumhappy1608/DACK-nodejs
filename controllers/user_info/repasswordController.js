const userModel = require('../../models/userModel');


exports.sendform = (req, res, next) => {
    res.render('user/re-password.hbs', null);
}
