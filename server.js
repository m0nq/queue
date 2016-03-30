//////////////////
// REQUIREMENTS //
//////////////////
var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override');
// env variable to determine whether in development, production, or test
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

////////////////////
// CONFIGURATIONS //
////////////////////
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
// override with different headers; last one takes precedence
app.use(methodOverride('X-HTTP-Method'));          // Microsoft
app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
app.use(methodOverride('X-Method-Override'));      // IBM
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// stylus middleware
app.use(stylus.middleware({
  src: __dirname + '/public',
  compile: function (str, path) {
    return stylus(str).set('filename', path);
  }
}));
// static routes
app.use(express.static(__dirname + '/public'));

////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
// default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
app.get('*', function (req, res) {
  res.render('index');
});

///////////////
// LISTENING //
///////////////
var port = 3030;
app.listen(port, function () {
  console.log("You're listening on the quiet storm... *port:", port);
});
