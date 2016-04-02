//////////////////
// REQUIREMENTS //
//////////////////
var express = require('express'),
    mongoose = require('mongoose'),
    // passport and passport-local help users to authenticate passwords stored locally in the database,
    // opposed to OAuth which authenticates through a third party
    passport = require('passport'),
    // strategies are how passport implements authentication
    // using a local strategy means a user can login using a username and password
    // that is kept within the local database
    localStrategy = require('passport-local').Strategy;
    // TODO: implement strategy to for facebook, google+, twitter

// env variable to determine whether in development, production, or test
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

////////////////////
// CONFIGURATIONS //
////////////////////
var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

//////////////////////
// Mongoose/MongoDB //
//////////////////////
require('./server/config/mongoose')(config);

//////////////
// Passport //
//////////////
// User model for passport lookup
var User = mongoose.model('User');
passport.use(new localStrategy(function (username, password, done) {
    // varify that the user name and password given are correct,
    // then find the correct user, and pass that document to the done function.
    User.findOne({username:username}).exec(function (err, user) {
      // NAIVE IMPLEMENTATION:
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }
));

// tell passport how to serialize a user
passport.serializeUser(function (user, done) {
  if (user) {
    done(null, user._id)
  }
});

// tell passport how to deserialie a user
passport.deserializeUser(function (id, done) {
  User.findOne({_id: id}).exec(function (err, user) {
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

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
