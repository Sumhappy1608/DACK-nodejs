const express = require('express');
const { route } = require('.');
const router = express.Router();
const login = require('../controllers/loginController');
const loginForm = login.sendform;
const passport = require('../passport');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
router.get('/', loginForm);

router.post('/login-action',
  passport.authenticate('local', { successReturnToOrRedirect: '/',
                                   failureRedirect: '/login?error=wrong-password',
                                   failureFlash: false })
);

// router.get('/LoginToComment', ensureLoggedIn('/login'), function(req, res){
//   //res.json({ user: req.user });
//   //console.log(req.originalUrl);
//   var backURL = req.header('Referer') || '/';
//    res.json({redir: backURL});
//   //res.redirect(req.originalUrl);
// });

// router.post('/login-action',
//   passport.authenticate('local'),
//   function(req, res) {
//     //res.redirect('/');
//     var backURL = req.header('Referer') || '/';
//     res.json({redir: backURL});
//   });


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