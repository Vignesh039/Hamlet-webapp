angular.module('consoles')
  .controller('GetUserController', ['$scope','$resource', '$http','localStorageService','ZIPPR_ENVIRONMENT',
    function ($scope, $resource,$http,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
      'use strict';
    var session = localStorageService.get("sessiontoken");
     $scope.getCities=function(){
      var req1 = {
            method: 'Get',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/cities",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            }
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                $scope.citiesList=data.response;
                console.log($scope.citiesList,"Cities list");
                 //$state.go('requests',{}, {reload: true});
              }else
              {
               $scope.message = data.error.reason;
              }
           }).error(function(data) {
              $scope.message ="Page not Found"
          });
    }  
 	
	$scope.getuserDetails=function(){
   
		var req1 = {
            method: 'GET',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/user/details",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            params:{"username":$scope.userEmail}
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                $scope.userDes=data.response;
                $scope.createErrorMessage=false;
                $scope.createMessage="User Created successfully";
                
               }else
              {
               $scope.createMessage = false;
               $scope.createErrorMessage=data.error.reason;
              }
           }).error(function(data) {
              $scope.createErrorMessage="Page Not Found";
          });
		
	}

  $scope.UpdateUserAccount=function()
  {
    console.log("update fired");
    var reqParams = {};
    reqParams["user_type"]= $scope.userDes.user_type;
    if($scope.userDes.user_type==="hamlet_executive")
    reqParams["cities"]= $scope.userDes.cities;

    var req1 = {
            method: 'PUT',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/user/"+$scope.userDes._id,
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:reqParams
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                $scope.updateErrorMessage = false;
                $scope.updatecreateMessage="UserAccount Updated successfully";
                
               }else
              {
               $scope.updatecreateMessage = false;
               $scope.updateErrorMessage=data.error.reason;
              }
           }).error(function(data) {
              $scope.updateErrorMessage="Page Not Found";
          });
  }

  }]);//main close
