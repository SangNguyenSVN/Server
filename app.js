var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');


const categoryCpanelRouter = require('./routes/cpanel/categoryCpanel');
const productCpanelRouter = require('./routes/cpanel/productCpanel');
const userCpanelRouter = require('./routes/cpanel/usersCpanel');

const categoryAPIRouter = require('./routes/api/categoryAIP');
const productAPIRouter = require('./routes/api/productAPI');
const userAPIRouter = require('./routes/api/userAPI');


const session = require('express-session');
const mongoose = require('mongoose');

// import mongo database
require('./components/category/CategoryModel');// cha
require('./components/product/ProductModel');// con

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'iloveyou',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));
// sever 
mongoose.connect('mongodb://127.0.0.1:27017/Mob402?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>> DB Error: ', err));

// http://localhost:3000
app.use('/', indexRouter);
// http://localhost:3000/users
app.use('/users', usersRouter);
// http://localhost:3000/product
app.use('/product', productRouter);

app.use('/api/user', userAPIRouter);

app.use('/api/category', categoryAPIRouter);

app.use('/api/product', productAPIRouter);

app.use('/cpanel/user', userCpanelRouter);

app.use('/cpanel/category', categoryCpanelRouter);
// http://localhost:3000/cpanel/product
app.use('/cpanel/product', productCpanelRouter);







// catch 404 and forward to error handler






app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
