const express = require('express');
const { route } = require('.');
const router = express.Router();
const login = require('../controllers/loginController');
const loginForm = login.sendform;
const passport = require('../passport');
const connectEnsureLogin  = require('connect-ensure-login');
router.get('/', loginForm);

var back = require('express-back');

router.post('/login-action',
  passport.authenticate('local', { successReturnToOrRedirect: '/',
                                   failureRedirect: '/login?error=wrong-password',
                                   failureFlash: false })
);

router.get('http://localhost:3000/checkout', connectEnsureLogin.ensureLoggedIn(), function(req, res){
  //res.json({ user: req.user });
  //console.log(req.originalUrl);
  // var backURL = req.header('Referer') || '/';
  //  res.json({redir: backURL});
  res.redirect("/");
});

// router.post('/login-action',
//   passport.authenticate('local'),
//   function(req, res) {
//     //console.log(req.user);
//     res.redirect('/');
//     // var backURL = req.header('Referer') || '/';
//     // res.json({redir: backURL});
//     //res.redirect('back');
//     //res.redirect(req.session.backURL);
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