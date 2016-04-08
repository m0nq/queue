angular.module('app').controller('courseListCtrl', function ($scope, course) {
  $scope.courses = course.query();
})
