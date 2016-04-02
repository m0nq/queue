angular.module('app').controller('navbarLoginCtrl', function ($scope, $http, identity, notifier, auth) {
  $scope.identity = identity;
  $scope.signIn = function (username, password) {
    auth.authenticateUser(username, password).then(function (success) {
      if (success) {
        notifier.notify("You are now signed in.")
      } else {
        notifier.notify("Incorrect Username/Password combination. Please try again.")
      }
    });
  };
});
