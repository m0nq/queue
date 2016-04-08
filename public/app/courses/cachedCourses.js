angular.module('app').factory('cachedCourses', function (course) {
  var courseList;

  return {
    query: function () {
      if (!courseList) {
        courseList = course.query();
      }
      return courseList;
    };
  };
});
