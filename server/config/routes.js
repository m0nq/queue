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
  app.put('/api/users', users.updateUser);

  // a unique path identifier for partials
  app.get('/partials/*', function (req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  // post route when a user is successfully found in the db
  app.post('/login', auth.authenticate);

  app.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*', function (req, res) {
    res.send(404);
  });

  // default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
  app.get('*', function (req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};
