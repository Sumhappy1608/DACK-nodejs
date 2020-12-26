const express = require('express');
const router = express.Router();

const forgot_password = require('../../controllers/user_info/forgot_passwordController');
const forgot_passwordForm = forgot_password.sendform;

router.get('/', forgot_passwordForm);

router.post('/change-pass', forgot_password.changePassAndSendEmail);

module.exports = router;