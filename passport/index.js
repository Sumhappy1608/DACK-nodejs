const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const userService = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '/auth/google/callback'
    },
    accessToken => {
      console.log(accessToken);
    }
  )
);

//Thông tin nào được lưu trong session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

//Muốn đọc thông tin từ session xuống để biết được user đó là ai
passport.deserializeUser(function(id, done) {
  userService.getUser(id).then((user) => {
    //console.log(user);
    done(null,user);
  });
});


module.exports = passport;