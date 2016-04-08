angular.module('consoles')
  .controller('LoginController', ['$rootScope','$scope','$cookies', '$state', 'localStorageService','$http','ZIPPR_ENVIRONMENT',

    function ($rootScope,$scope,$cookies, $state, localStorageService,$http,ZIPPR_ENVIRONMENT) {
    'use strict';
    
    $scope.login = function(data){
    var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/user/login",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey
            },
            data:{"username":$scope.userName,
                  "password":$scope.password}
            };

             $http(req1).success(function(data,status,headers,config) {
              if(data.ok === true)
              {
                 localStorageService.set("userName", data.response.username);
                 localStorageService.set("sessiontoken", data.response["x-hamlet-sessiontoken"]);
                 localStorageService.set("userType", data.response.user_type);
                 $state.go('requests',{}, {reload: true});
              }else
              {
               $scope.message = data.error.reason;
              }
           }).error(function(data) {
              $scope.message="Page Not Found";
          });
     
    };
    $scope.passWordForm = function(){
      var username = localStorageService.get("userName");
      $scope.userName = username;

    }
    

    $scope.ChangePass= function(data){
      var session = localStorageService.get("sessiontoken");
       var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/user/password/change",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:{"existing_password":$scope.oldpassword,
                  "new_password":$scope.newpassword}
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                $scope.message="passwordword Changed Successfully";
                $scope.submitbtn = true;
                localStorageService.clearAll();
              }else
              {
               $scope.loginstatus = data.error.reason;
              }
           }).error(function(data) {
              $scope.message="Page Not Found";
          });
     
    };

  }]);
