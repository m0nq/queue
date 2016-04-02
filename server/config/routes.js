var auth = require('./auth');

////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
module.exports = function (app) {
  // a unique path identifier for partials
  app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
  });

  // post route when a user is successfully found in the db
  app.post('/login', auth.authenticate);

  // default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
  app.get('*', function (req, res) {
    res.render('index');
  });
};
