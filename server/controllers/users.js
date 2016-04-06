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
