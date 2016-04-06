angular.module('app').controller('userListCtrl', function ($scope, user) {
  $scope.users = user.query();
});
