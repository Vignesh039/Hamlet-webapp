(function() {
  'use strict';

  angular
    .module('webapp')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController'
      })
      .state('zipprs', {
        url: '/zipprs',
        templateUrl: 'app/main/zipprs.html',
        controller: 'ZipprController'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/main/login.html',
        controller: 'LoginController'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
