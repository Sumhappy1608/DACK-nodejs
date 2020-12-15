const express = require('express');
const router = express.Router();
const signup = require('../controllers/signupController');
const signupForm = signup.sendform;
const regis = signup.registration;

router.get('/', signupForm);

router.post('/pre-regis', regis);

module.exports = router;