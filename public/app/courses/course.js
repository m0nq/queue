angular.module('app').factory('course', function ($resource) {
  // TODO: get MOOC apis and place them here
  var CourseResource = $resource('/api/courses/:id', {_id: "@id"}, {
    update: {method: 'PUT', isArray: false}
  });

  return CourseResource;
});
