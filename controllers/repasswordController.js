const userModel = require('../models/userModel');


exports.sendform = (req, res, next) => {
    res.render('re-password.hbs', null);
}
