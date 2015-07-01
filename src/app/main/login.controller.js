angular.module('webapp')
  .controller('LoginController', ['$scope','$resource', '$state', '$log','ZIPPR_CONSTANTS', 'AuthService',

    function ($scope,$resource, $state, $log,ZIPPR_CONSTANTS, AuthService) {

    'use strict';

    $scope.login = function(data){
      AuthService.login(data.username, data.password)
          .then(function(authenticated){
            $state.go('zipprs',{}, {reload: true});
          }, function(error){
            $log.console(error);
          });
    };

  }]);
