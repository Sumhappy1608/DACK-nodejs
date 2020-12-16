const express = require('express');
const router = express.Router();
const login = require('../controllers/loginController');
const loginForm = login.sendform;
const passport = require('../passport');

router.get('/', loginForm);

router.post('/login-action',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

/*router.post('/login-action', (req, res) => {
    console.log("Đã nhấn nút sign in");
    //res.redirect('/');
    res.redirect('/login');
});*/

/*router.get('/signup', (req, res) => {
    res.redirect('/signup');
});*/

/*router.get('/back', (req, res) => {
    res.redirect('/');
})*/

module.exports = router;