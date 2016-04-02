angular.module('app').controller('navbarLoginCtrl', function ($scope) {
  $scope.signIn = function (username, password) {
    console.log("Message from navbarLoginCtrl...");
  };
});
