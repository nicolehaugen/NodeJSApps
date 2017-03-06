var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var passport = require('passport');
var methodOverride = require('method-override');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Baby Bytes', userFullName: req.user ? req.user.fullName : '' });
});

module.exports = router;
var mongoose = require('./config/mongoose');
var db = mongoose();
require("./models/offer.server.model");
require("./models/dailylog.server.model");
require("./models/baby.server.model");
require("./models/user.server.model");

var index = require('./routes/index.server.route');
var users = require('./routes/user.server.route');
var baby = require('./routes/baby.server.route');
var dailyLog = require('./routes/dailylog.server.route');
var offer = require('./routes/offer.server.route');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Method override is used in order to send PUT/DELETE requests from the browser - otherwise, the 
//browser always sends a GET: http://stackoverflow.com/questions/9859287/expressjs-support-for-method-delete-and-put-without-the-methodoverride
app.use(methodOverride('_method'));

app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: "test"
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/baby', baby);
app.use('/dailylog', dailyLog);
app.use('/offer', offer);

//app.use(express.static('./staticfiles'));
app.use(express.static('./public'));

var myPassport = require('./config/passport');
myPassport();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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