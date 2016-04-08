angular.module('app').controller('profileCtrl', function ($scope, auth, identity, notifier) {
  $scope.email = identity.currentUser.email;
  $scope.username = identity.currentUser.username;
  $scope.fname = identity.currentUser.firstName;
  $scope.lname = identity.currentUser.lastName;

  $scope.update = function () {
    var newUserData = {
      username: $scope.username,
      email: $scope.email,
      firstName: $scope.fname,
      lastName: $scope.lname
    };

    if ($scope.password && $scope.password.length > 0) {
      newUserData.password = $scope.password;
    }

    auth.updateCurrentUser(newUserData).then(function () {
      notifier.notify("Your account has been successfully updated.");
    }, function (reason) {
      notifier.error(reason);
    });
  };
});
