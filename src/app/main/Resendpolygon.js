angular.module('consoles')

.controller('Resendpolygon', function modalController ($scope,$http, $modalInstance,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
    'use strict';
     var objdata = Messages.getData(); 
     var session = localStorageService.get("sessiontoken");
     $scope.polygonName = objdata.features[0].properties.name;
     $scope.userConfirmation = function(str)
	  {
  		if(str ==="Yes")
  		{
  			$scope.updateNeighbour();
  		}else
  		{
  			$modalInstance().dismiss('Resendpolygon Rejected');
  		}
  		
	  }

	  $scope.updateNeighbour=function(){
      console.log(objdata.features[0],"objdata.features[0]");
      var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"/hamlet/nadmin/neighbourhoods/resend",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:{  "geometry" : objdata.features[0].geometry,
                    "neighbourhood_draft_id":objdata.features[0].id

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
