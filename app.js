var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routers/index');
var loginRouter = require('./routers/login');
var signupRouter = require('./routers/signup');
var catalogRouter = require('./routers/catalog');
var productRouter = require('./routers/product');
var userRouter = require('./routers/user/user');
var passport = require('./passport/index');
const userApiRouter = require('./routers/api/users');
var repasswordRouter = require('./routers/repassword');


require('./database/db');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport middlewares
//app.use(session({ secret: process.env.SESSION_SECRET}));
app.use(session({ secret: 'secret-cat'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.user = req.user;
  next()
});

app.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

//router.get('/google/callback', passport.authenticate('google'));
app.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  console.log("đăng nhập google thành công ");
  res.redirect('/');
});

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/catalog', catalogRouter);
app.use('/product', productRouter);
app.use('/api/users', userApiRouter);
app.use('/user', userRouter);
app.use('/re-password', repasswordRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;


