angular.module('app').factory('identity', function () {
  // more explicitly defining that there is an undefined current user on this object.
  return {
    currentUser: undefined,
    isAuthenticated: function () {
      return !!this.currentUser;
    }
  };
});
