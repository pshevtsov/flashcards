'use strict';

/**
 * @ngdoc overview
 * @name flashcardsApp
 * @description
 * # flashcardsApp
 *
 * Main module of the application.
 */
var app = angular.module('flashcardsApp', [
  'ngAnimate',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'LocalStorageModule',
  'ui.bootstrap'
]);
app.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix(app.name);
}]);
app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/cards.html',
    controller: 'CardsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});
