var express = require('express');
var router = express.Router();
const userController = require('../../controllers/userController');

router.get('/', (req, res) => {
    console.log(req.user);
    res.render('user/user.hbs', null);
});

router.post('/change-info', userController.updateEmailPhoneAndImage);

module.exports = router;