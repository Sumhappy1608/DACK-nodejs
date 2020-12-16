const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const userService = require('../models/userModel');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    const user = await userService.checkCredential(username, password);
    if (!user) {
      return done(null, false, { message: 'Incorrect username or password!' });
    }
    return done(null,user);
  }

  /*User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }*/

));

//Thông tin nào được lưu trong session
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

//Muốn đọc thông tin từ session xuống để biết được user đó là gì
passport.deserializeUser(function(id, done) {
  userService.getUser(id).then((user)=>{
    done(null,user);
  })
  
});

module.exports = passport;