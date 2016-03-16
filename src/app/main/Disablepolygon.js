angular.module('consoles')

.controller('Disablepolygon', function modalController ($scope,$http, $modalInstance,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
    'use strict';
     var objdata = Messages.getData(); 
     console.log(objdata,"from disable ");
     var session = localStorageService.get("sessiontoken");
     $scope.polygonName = objdata.properties.name;
     $scope.userConfirmation = function(str)
	  {
  		if(str ==="Yes")
  		{
  			$scope.disableNeighbour();
  		}else
  		{
  			$modalInstance().dismiss('Polygon Not Disabled');
  		}
  		
	  }

	  $scope.disableNeighbour=function(){
      
      var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/disable",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:{  "neighbourhood_id":objdata.id

            }
            };

            $http(req1).success(function(data) {
              if(data.ok === true)
              {
              	$modalInstance().dismiss('success');
               
               }else
              {
              	$modalInstance().dismiss(data.error.reason);
               
              }
           }).error(function(data) {
              $modalInstance().dismiss(data);
           });
         
     
     }

      

    });
