// stores the fact that someone is logged in, and that current user
angular.module('app').factory('identity', function ($window, user) {
  var currentUser;
  if ($window.bootstrappedUserObject) {
    currentUser = new user();
    angular.extend(currentUser, $window.bootstrappedUserObject);
  }

  // more explicitly defining that there is an undefined current user on this object.
  return {
    currentUser: currentUser,
    isAuthenticated: function () {
      return !!this.currentUser;
    },
    isAuthorized: function (role) {
      return role === 'admin';
    }
  };
});
