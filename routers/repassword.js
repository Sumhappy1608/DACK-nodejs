const express = require('express');
const router = express.Router();
const repassword = require('../controllers/repasswordController');
const repasswordForm = repassword.sendform;

router.get('/', repasswordForm);

module.exports = router;