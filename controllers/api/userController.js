const userService = require("../../models/userModel");

exports.isExist = async (req, res, next) => {
    res.json(await userService.isUsernameExist(req.query.username));
}