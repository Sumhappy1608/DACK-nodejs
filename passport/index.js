const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const userService = require('../models/userModel');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    const user = await userService.checkCredential(username, password);
    //console.log(user);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password!' });
    }
    return done(null,user);
  }
));

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