const express = require('express');
const router = express.Router();
const login = require('../controllers/loginController');
const loginForm = login.sendform;

router.get('/', loginForm);

/*router.get('/signup', (req, res) => {
    res.redirect('/signup');
});*/

/*router.get('/back', (req, res) => {
    res.redirect('/');
})*/

module.exports = router;