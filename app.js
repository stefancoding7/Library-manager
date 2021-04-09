var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


var app = express();


//import sequelize
const sequelize = require('./models').sequelize;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  err.message = 'Page not found.';
  // res.render('page-not-found', { error })
  next(err);
});


// catch 500 error and forward to error handler
 app.use(function(err, req, res, next) {
   if(err.status === 404) {
     res.locals.error = err;
     res.render('page-not-found')
  } else if (!err.status === 404) {
    err.status = 500;
    err.message = 'Sorry something went wrong.';   
    res.locals.error = err;
    res.render('error', { err });
  }

 })

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});


// Console log conection in to DB
(async () => {
      try {
          await sequelize.authenticate();
          console.log('Connection to the database successful!');
  
      } catch (error) {
          console.error('Error connecting to the database: ', error);
  
      }
    
  })();

module.exports = app;
