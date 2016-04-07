angular.module('app').controller('navbarLoginCtrl', function ($scope, $http, $location, identity, notifier, auth) {
  $scope.identity = identity;
  $scope.signin = function (username, password) {
    auth.authenticateUser(username, password).then(function (success) {
      if (success) {
        notifier.notify("You are now signed in.")
      } else {
        notifier.notify("Incorrect Username/Password combination. Please try again.")
      }
    });
  };

  $scope.signOut = function () {
    auth.logoutUser().then(function () {
      $scope.username = "";
      $scope.password = "";
      notifier.notify("You have been signed out");
      $location.path('/');
    })
  }
});
