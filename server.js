//////////////////
// REQUIREMENTS //
//////////////////
var express = require('express'),
    mongoose = require('mongoose');

// env variable to determine whether in development, production, or test
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

////////////////////
// CONFIGURATIONS //
////////////////////
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

// //////////////////////
// // Mongoose/MongoDB //
// //////////////////////
require('./server/config/mongoose')(config);

////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
require('./server/config/routes')(app);

///////////////
// LISTENING //
///////////////
app.listen(config.port, function () {
  console.log("You're listening on the quiet storm... *port:", config.port);
});
