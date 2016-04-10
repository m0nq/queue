angular.module('app').factory('auth', function ($http, $q, identity, user) {
  return {
    authenticateUser: function (username, password) {
      var dfd = $q.defer();
      $http.post('/login', {username: username, password: password}).then(function (response) {
        if (response.data.success) {
          var newUser = new user();
          angular.extend(newUser, response.data.user);
          identity.currentUser = newUser;
          dfd.resolve(true);
        } else {
          dfd.resolve(false);
        }
      });
      return dfd.promise;
    },

    createUser: function (newUserData) {
      var newUser = new user(newUserData);
      var dfd = $q.defer();

      newUser.$save().then(function () {
        identity.currentUser = newUser;
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
      });
      return dfd.promise;
    },

    updateCurrentUser: function (newUserData) {
      console.log(newUserData);
      var dfd = $q.defer();

      var clone = angular.copy(identity.currentUser);
      angular.extend(clone, newUserData);
      clone.$update().then(function () {
        identity.currentUser = clone;
        dfd.resolve();
      }, function (response) {
        dfd.reject(response.data.reason);
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
    },

    authorizeCurrentUserForRoute: function (role) {
      if (identity.isAuthorized(role)) {
        return true;
      } else {
        return $q.reject('not authorized');
      }
    },

    authorizeAuthenticatedUserForRoute: function () {
      if (identity.isAuthenticated()) {
        return true;
      } else {
        $q.reject('not authorized');
      }
    }
  };
});
