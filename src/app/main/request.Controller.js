
angular.module('consoles')
  .controller('requestController', ['$scope','localStorageService','$location', '$state','ZIPPR_ENVIRONMENT','$http',
    function ($scope,localStorageService,$location,$state,ZIPPR_ENVIRONMENT,$http) {
      'use strict';
    
     $scope.request = {};
     $scope.request.stats = "PENDING";

     $scope.pagination = {
        perPage: 20,
        currentPage: 1,
        total: 200
        };


     $scope.getRecords=function(){
      $location.stat = $scope.request.stats;
      $scope.getRequests();
     }
     $scope.getRequests=function(){
      $scope.pageChangeHandler(1);
      };
      $scope.pageChangeHandler = function(num) {
        var recordsStatus;
        if($location.stat !== undefined)
        {
          recordsStatus = $location.stat;
          $scope.request.stats = $location.stat;
        }else
        {
          recordsStatus = $scope.request.stats;
        }
      console.log($location.stat,"$location.stat");
      var session = localStorageService.get("sessiontoken");
      var userType = localStorageService.get("userType");
      var path;
     if (userType ==="hamlet_executive") {
      path ="hamlet/nadmin/neighbourhoods/myrequests";
     }else
     {
      path ="hamlet/nadmin/neighbourhoods/requests";
     }
     var req1 = {
            method: 'GET',
            url: ZIPPR_ENVIRONMENT.server+path,
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            params:{"status":recordsStatus}
            };//,"page_no":1,"page_size":20

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.message =false;
               $scope.stausReport = data.response;
               $scope.pagination.total = 200;
               }else
              {
               $scope.message = data.error;
              }
           }).error(function(data) {
              console.log(data,"error data");
           });
     };

     $scope.GotoViewpage = function(obj)
     {
      $location.id = obj.listzippr._id;
      $location.stat = $scope.request.stats; 
      }




  }]);
