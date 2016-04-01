//////////////////
// REQUIREMENTS //
//////////////////
var express = require('express'),
    stylus = require('stylus'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    methodOverride = require('method-override'),
    mongoose = require('mongoose');
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

//////////////////////
// Mongoose/MongoDB //
//////////////////////
// connect to the Mongo database
// if in development mode
if (env === 'development') {
  mongoose.connect('mongodb://localhost/queue'); // connect to local db
} else { // otherwise
  mongoose.connect('mongodb://qube:l3v147h4n@ds011860.mlab.com:11860/the-queue'); // connect to remote db
}
var db = mongoose.connection;
// listen for errors
db.on('error', function (err) {
  console.error('connection error: ', err);
});

db.once('open', function callback() {
  console.log('Queue db is now open...');
});
var messageSchema = mongoose.Schema({
  message: String
});

////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
// a unique path identifier for partials
app.get('/partials/:partialPath', function (req, res) {
  res.render('partials/' + req.params.partialPath);
});
// default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
app.get('*', function (req, res) {
  res.render('index');
});

///////////////
// LISTENING //
///////////////
var port = process.env.PORT || 3030;
app.listen(port, function () {
  console.log("You're listening on the quiet storm... *port:", port);
});
