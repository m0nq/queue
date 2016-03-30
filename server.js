// REQUIREMENTS
var express = require('express');
// env variable to determine whether in development, production, or test
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();

// CONFIGURATIONS
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

// ROUTE/REGISTRATION
// default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
app.get('*', function (req, res) {
  res.render('index');
});

// LISTENING
var port = 3030;
app.listen(port, function () {
  console.log("You're listening on the quiet storm... *port:", port);
});
