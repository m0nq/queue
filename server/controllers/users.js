var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');

exports.getUsers = function (req, res) {
  User.find({}).exec(function (err, collection) {
    res.send(collection);
  });
};

exports.createUser = function (req, res, next) {
  var userData = req.body;
  userData.username = userData.username.toLowerCase();
  userData.hashed_pwd = encrypt.createHash(userData.password);
  User.create(userData, function (err, user) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Username');
      }
      console.error("Error:", err);
      res.status(400);
      return res.send({reason: err.toString()});
    }
    // if there's no error, log the user in, then send user back to client so that the resource gets updated with the correct value.
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      res.send(user);
    });
  });
};

exports.updateUser = function (req, res) {
  var userUpdates = req.body;

  // make sure that the user being updated is the same as the user that's logged in, or is an admin.
  if (req.user._id != userUpdates._id && !req.user.hasRole('admin')) {
    res.status(403);
    return res.end();
  } // otherwise update the user.

  req.user.firstName = userUpdates.firstName;
  req.user.lastName = userUpdates.lastName;
  req.user.username = userUpdates.username;

  if (userUpdates.password && userUpdates.password.length > 0) {
    req.user.hashed_pwd = encrypt.createHash(userUpdates.password);
  }

  req.user.save(function (err) {
    if (err) {
      res.status(400);
      return res.send({reason: err.toString()});
    }
    res.send(req.user);
  });
};
