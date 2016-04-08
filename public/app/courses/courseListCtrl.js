angular.module('app').controller('courseListCtrl', function ($scope, course) {
  $scope.courses = course.query();

  $scope.sortOptions = [{
    value: "title",
    text: "Sort by Title"
  },
  {
    value: "published",
    text: "Sort by Publish Date"
  }];
  $scope.sortOrder = $scope.sortOptions[0].value;
})
