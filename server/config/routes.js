////////////////////////
// ROUTE/REGISTRATION //
////////////////////////
module.exports = function (app) {
  // a unique path identifier for partials
  app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
  });
  // default match all routes; i.e. catch all in order to coordinate/not conflict with Angular routing
  app.get('*', function (req, res) {
    res.render('index');
  });
};
