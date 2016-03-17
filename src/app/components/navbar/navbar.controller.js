
angular.module('consoles')
  .controller('NavbarController', ['$rootScope','$scope','localStorageService', '$state','ZIPPR_ENVIRONMENT','$http',
    function ($rootScope,$scope,localStorageService,$state,ZIPPR_ENVIRONMENT,$http) {
      'use strict';
     var username = localStorageService.get("userName");
     $scope.LoggedInUser = username;
     var userType = localStorageService.get("userType");
     if (userType ==="hamlet_executive") {
      $scope.loginMessage="Logged In Executive : ";
      $scope.Requests = "MyRequests";
      $scope.newUser = false;
     }else
     {
      $scope.loginMessage="Logged In Manager : ";
      $scope.Requests = "Requests";
      $scope.newUser = true;
     }
     
     
     $scope.setTab = function (tabId) {
           $rootScope.tab = tabId;
    };

        $scope.isSet = function (tabId) {
          if ($rootScope.tab === undefined)
           {$rootScope.tab = 1;}
            $scope.tab = $rootScope.tab;
            return $scope.tab===tabId;
        };

     $scope.logout=function(){
      var session = localStorageService.get("sessiontoken");
      	var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/user/logout",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            }
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               localStorageService.clearAll();
               $rootScope.tab =1;
                $state.go('login',{}, {reload: true});
              }else
              {
               $scope.message = data.error;
              }
           }).error(function(data) {
              console.log(data,"error data");
           });
      };


  }]);
