(function() {
  'use strict';

  angular
    .module('consoles')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/main/login.html',
        controller: 'LoginController'
      })
      .state('requests', {
        url: '/requests',
        templateUrl: 'app/main/requests.html',
        controller: 'requestController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      })
      .state('neighbours', {
        url: '/neighbours',
        templateUrl: 'app/main/neighbours.html',
        controller: 'NeighbourController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      }).state('update', {
        url: '/update',
        templateUrl: 'app/main/update.html',
        controller: 'UpdateController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      }).state('disable', {
        url: '/disable',
        templateUrl: 'app/main/disable.html',
        controller: 'DisableController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      }).state('edit', {
        url: '/edit',
        templateUrl: 'app/main/edit.html',
        controller: 'editController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      }).state('createUser', {
        url: '/createUser',
        templateUrl: 'app/main/createUser.html',
        controller: 'MainController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      }).state('password', {
        url: '/password',
        templateUrl: 'app/main/password.html',
        controller: 'LoginController',
        resolve:{status: function(AuthService){
              return AuthService.getStatus();
            }
          }
      });

    $urlRouterProvider.otherwise('/login');
  }

})();
