angular.module('consoles')

.controller('MessageDismiss', function modalController ($scope,$http, $modalInstance,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
    'use strict';
     $scope.userConfirmation = function(str)
	  {
  		
  			$modalInstance().dismiss('No');
  		
	  }

	  
      

    });
