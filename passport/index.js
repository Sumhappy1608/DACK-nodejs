const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const userService = require('../models/userModel');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new LocalStrategy(
  async function(username, password, done) {
    const user = await userService.checkCredential(username,password);
    if(!user)
    {
      return done(null,false,{message:'Incorrect username or password'});
    }
    return done(null,user);
  }
));

//Thông tin nào được lưu trong session
passport.serializeUser(function(user, done) {
   done(null, user._id);
   //done(null,user.id);
});

//Muốn đọc thông tin từ session xuống để biết được user đó là ai
passport.deserializeUser(function(id, done) {
  userService.getUser(id).then((user) => {
    //console.log(user);
    done(null,user);
  });
});


passport.use(new GoogleStrategy({
  clientID: '1053805955390-jo5u4vmvr4afmcc5heje7pr13kqtuh7k.apps.googleusercontent.com',
  clientSecret: 'YNoJifngoikZNh1pkUKi2lTg',
  callbackURL: 'http://localhost:3000/google/callback'
  },
  function (accessToken, refreshToken, profile, cb) {
    console.log(profile);
    cb(null,profile);
  }
));

module.exports = passport;