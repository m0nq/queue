// create angular module
var app = angular.module('app', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
  var routeRolesChecks = {
    admin: {auth: function (auth) {
      return auth.authorizeCurrentUserForRoute('admin');
    }},
    user: {auth: function (auth) {
      return auth.authorizeAuthenticatedUserForRoute();
    }}
  };

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
  })
  .when('/profile', {
    templateUrl: '/partials/profile',
    controller: 'profileCtrl',
    resolve: routeRolesChecks .user
  });
});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  });
});
