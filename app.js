var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Import routers for different routes in the application
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var labRouter = require('./routes/lab');
var jwtMiddleware = require('./routes/jwtmiddleware')
var deviceRouter = require('./routes/device')

var app = express();

// Setting up the view engine for the app
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware to enable cross-origin access
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Adding middleware for logging, parsing JSON and URL-encoded data, and handling cookies
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route that requires JWT verification
// This uses the jwtMiddleware to secure the device route
app.use("/device", jwtMiddleware, deviceRouter);

// Routes for different sections of the application
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/device', deviceRouter);

// Catch 404 errors and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// General error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// Code for starting the server (commented out for now)
// app.listen(3000, function() {
//   console.log("Server running on port 3000");
// });
// console.log("running");

// Exporting the app for use elsewhere in the application
module.exports = app;
