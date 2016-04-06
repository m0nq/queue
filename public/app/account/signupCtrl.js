angular.module('app').controller('signupCtrl', function ($scope, $location, auth, user, notifier) {
  $scope.signup = function () {
    var newUserData = {
      username: $scope.email,
      password: $scope.password,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    auth.createUser(newUserData).then(function () {
      notifier.notify("User account created!");
      $location.path('/');
    }), function (reason) {
      notifier.error(reason);
    }
  }
})
