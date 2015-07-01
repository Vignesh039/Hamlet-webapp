angular.module('webapp')
  .controller('ZipprController', ['$scope','$resource', '$log','ZIPPR_CONSTANTS',
    function ($scope,$resource, $log,ZIPPR_CONSTANTS) {
      'use strict';

    //these are all DUMMY. Please remove these and add your own code.....

    $scope.zipprs = [];

    $scope.getZipprList = function(){
      //make a request with $resource
      // var result = $resource(ZIPPR_CONSTANTS.server);
      // $scope.zipprs = result.query();
      // $log.info($scope.offers);
    };
  }]);
