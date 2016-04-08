angular.module('consoles')
  .controller('MainController', ['$scope','$resource', '$http','localStorageService','ZIPPR_ENVIRONMENT',
    function ($scope, $resource,$http,localStorageService,ZIPPR_ENVIRONMENT,Messages) {
      'use strict';
     
 	$scope.accForm={};
  $scope.accForm.utype = "hamlet_executive";
 	$scope.accForm.city="HYD";
 	$scope.myValue = true;
  var session = localStorageService.get("sessiontoken");
      

$scope.getCities=function(){
  //$scope.accForm.uname="";
  //$scope.accForm.pwd="";
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
  $scope.userTypeSelction=function(){
  	if($scope.accForm.utype ==="hamlet_executive")
  		{
  			$scope.myValue = true;
  		}else
  		{
  			$scope.myValue = false;
  		}
  	
  	
  }
	$scope.createAccount=function(){
    console.log("createAccount");
    var reqParams = {};
    reqParams["email"]=$scope.accForm.uname;
    reqParams["password"]=$scope.accForm.pwd;
    reqParams["user_type"]=$scope.accForm.utype;
    if($scope.accForm.utype === "hamlet_executive")
    reqParams["cities"]=$scope.accForm.city;
  
		var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"/hamlet/nadmin/user",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:reqParams
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                $scope.createErrorMessage=false;
                $scope.createMessage="User Created successfully";
                $scope.submitbtn = true;
               }else
              {
               $scope.createMessage = false;
               $scope.createErrorMessage=data.error.reason;
              }
           }).error(function(data) {
              $scope.createErrorMessage="Page Not Found";
          });
		
	}

  }]);//main close
