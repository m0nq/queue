angular.module('app').controller('navbarLoginCtrl', function ($scope) {
  $scope.signin = function (username, password) {
    console.log("Message from navbarLoginCtrl...");
  };
});
