var passport = require('passport');
////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
module.exports = function (app) {
  // a unique path identifier for partials
  app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
  });

  // post route when a user is successfully found in the db
  app.post('/login', function (req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
      if (err) {return next(err);}
      if (!user) {res.send({success: false});}
      // logIn is a function that passport adds to the req object
      req.logIn(user, function (err) {
        if (err) {return next(err);}
        res.send({success: true, user: user});
      });
    })
    auth(req, res, next);
  });

  // default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
  app.get('*', function (req, res) {
    res.render('index');
  });
};
