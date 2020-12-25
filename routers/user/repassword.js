const express = require('express');
const router = express.Router();
const repassword = require('../../controllers/user_info/repasswordController');
const repasswordForm = repassword.sendform;

router.get('/', repasswordForm);

router.post('/change-pass', repassword.changePassword);

module.exports = router;