angular.module('app').factory('auth', function ($http, $q, identity, user) {
  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password})
      .then(function (response) {
        if (response.data.success) {
          var newUser = new user();
          angular.extend(user, response.data.user);
          identity.currentUser = newUser;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },
    logoutUser: function () {
      var dfd = $q.defer();
      $http.post('/logout', {logout: true}).then(function () {
        identity.currentUser = undefined;
        dfd.resolve();
      });
      return dfd.promise;
    }
  };
});
