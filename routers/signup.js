const express = require('express');
const router = express.Router();
const signup = require('../controllers/signupController');
const signupForm = signup.sendform;

router.get('/', signupForm);

module.exports = router;