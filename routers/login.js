const express = require('express');
const { route } = require('.');
const router = express.Router();
const login = require('../controllers/loginController');
const loginForm = login.sendform;
const passport = require('../passport');

router.get('/', loginForm);

router.post('/login-action',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login?error=wrong-password',
                                   failureFlash: false })
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

/*router.get('/signup', (req, res) => {
    res.redirect('/signup');
});*/

/*router.get('/back', (req, res) => {
    res.redirect('/');
})*/

module.exports = router;