var passport = require('passport');

exports.authenticate = function (req, res, next) {
  var auth = passport.authenticate('local', function (err, user) {
    if (err) {return next(err);}
    if (!user) {res.send({success: false});}
    // logIn is a function that passport adds to the req object
    req.logIn(user, function (err) {
      if (err) {return next(err);}
      res.send({success: true, user: user});
    });
  });
  auth(req, res, next);
};

exports.requiresApiLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    res.send(403);
    res.end();
  } else {
    next();
  }
};
