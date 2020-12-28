const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');

const indexRouter = require('./routers/index');
const loginRouter = require('./routers/login');
const signupRouter = require('./routers/signup');
const catalogRouter = require('./routers/catalog');
const productRouter = require('./routers/product');
const userRouter = require('./routers/user/user');
const passport = require('./passport/index');
const userApiRouter = require('./routers/api/users');
const repasswordRouter = require('./routers/user/repassword');
const forgot_passwordRouter = require('./routers/user/forgot_password');


require('./database/db');

const app = express();
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
app.use('/forgot_password', forgot_passwordRouter);
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


