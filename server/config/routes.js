var auth = require('./auth'),
    users = require('../controllers/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
module.exports = function (app) {

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.post('/api/users', users.createUser);

  // a unique path identifier for partials
  app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
  });

  // post route when a user is successfully found in the db
  app.post('/login', auth.authenticate);

  app.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });

  // default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
  app.get('*', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
