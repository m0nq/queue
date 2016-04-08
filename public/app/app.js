// create angular module
var app = angular.module('app', ['ngResource', 'ngRoute'])
.config(function ($routeProvider, $locationProvider) {
  var routeRoleChecks = {
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
    templateUrl: '/partials/main/main',
    controller: 'mainCtrl'
  })
  .when('/signup', {
    templateUrl: '/partials/account/signup',
    controller: 'signupCtrl'
  })
  .when('/admin/users', {
    templateUrl: '/partials/admin/user-list',
    controller: 'userListCtrl',
    resolve: routeRoleChecks.admin
  })
  .when('/profile', {
    templateUrl: '/partials/account/profile',
    controller: 'profileCtrl',
    resolve: routeRoleChecks.user
  });
});

angular.module('app').run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (evt, current, previous, rejection) {
    if (rejection === 'not authorized') {
      $location.path('/');
    }
  });
});
