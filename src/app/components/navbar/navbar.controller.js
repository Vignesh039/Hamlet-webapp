
angular.module('webapp')
  .controller('NavbarController', ['$scope', 'ZIPPR_CONSTANTS',
    function ($scope, ZIPPR_CONSTANTS) {
      'use strict';
      $scope.date = new Date();
      $scope.zippr_server = ZIPPR_CONSTANTS.zippr_server;
  }]);
