// create angular module
var app = angular.module('app', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
  $routeProvider.when('/', {
    templateUrl: '/partials/main',
    controller: 'mainCtrl'
  })
  .when('/signup', {
    templateUrl: '/partials/signup',
    controller: 'signupCtrl'
  })
  .when('/admin/user', {
    templateUrl: '/partials/user-list',
    controller: 'userListCtrl'
  });
});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  });
});
