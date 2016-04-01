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
  });
});
