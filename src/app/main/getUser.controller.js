angular.module('consoles')
  .controller('GetUserController', ['$scope','$resource', '$http','localStorageService','ZIPPR_ENVIRONMENT',
    function ($scope, $resource,$http,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
      'use strict';
    var session = localStorageService.get("sessiontoken");
     $scope.userDes={};
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
      $scope.userDes={};
      $scope.createMessage=false;
      $scope.updateErrorMessage=false;
      $scope.updatecreateMessage=false;
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
                
                if ((data.response.user_type == "hamlet_executive")||(data.response.user_type == "hamlet_manager"))
                 {
                  $scope.userDes=data.response;
                }else
                {
                  $scope.userDes=data.response;
                  if(data.response.user_type.length>0)
                  {
                    for(var i=0;i<data.response.user_type.length;i++)
                    {
                      if ((data.response.user_type[i] == "hamlet_executive")||(data.response.user_type[i] == "hamlet_manager"))
                        $scope.userDes.user_type=data.response.user_type[i];
                    }
                  }
                  else
                  $scope.userDes.user_type="null";
                }
                
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
    console.log($scope.userDes.user_type,"update fired");
   if($scope.userDes.user_type !== 'null')
   {
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
        }else
        {
          $scope.updateErrorMessage ="Select userType"
        }

  }

  }]);//main close
