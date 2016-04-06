//////////////
// Passport //
//////////////
var mongoose = require('mongoose'),
    // passport and passport-local help users to authenticate passwords stored locally in the database,
    // opposed to OAuth which authenticates through a third party
    passport = require('passport'),
    // strategies are how passport implements authentication
    // using a local strategy means a user can login using a username and password
    // that is kept within the local database
    LocalStrategy = require('passport-local').Strategy;
    // TODO: implement strategy to for facebook, google+, twitter

// User model for passport lookup
var User = mongoose.model('User');

module.exports = function () {
  passport.use(new LocalStrategy(
    function (username, password, done) {
      // varify that the user name and password given are correct,
      // then find the correct user, and pass that document to the done function.
      User.findOne(username, function (err, user) {
        // NAIVE IMPLEMENTATION:
        console.log(user);
        if (user && user.authenticate(password)) {
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
};
