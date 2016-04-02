angular.module('app').controller('navbarLoginCtrl', function ($scope, $http) {
  $scope.signIn = function (username, password) {
    $http.post('/login', {username: username, password: password})
    .then(function (response) {
      if (response.data.success) {
        console.log("success!");
      } else {
        console.log("failed to log in. :'(");
      }
    })
  };
});
