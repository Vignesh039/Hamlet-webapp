
angular.module('consoles')
  .controller('requestController', ['$scope','localStorageService','$location', '$state','ZIPPR_ENVIRONMENT','$http',
    function ($scope,localStorageService,$location,$state,ZIPPR_ENVIRONMENT,$http) {
      'use strict';
    
     $scope.request = {};
     $scope.request.stats = "PENDING";

     $scope.pagination = {
        perPage: 20,
        currentPage: 1,
        total: 20
        };
      var userType = localStorageService.get("userType");
     if (userType ==="hamlet_executive") {
       $scope.actionBy = false;
       $scope.userRole= true;
     }else
     {
      $scope.actionBy = true;
      $scope.userRole= true;
     }

     $scope.getRecords=function(){
      $location.stat = $scope.request.stats;
      $scope.pagination.currentPage = 1;
      $scope.getRequests();
      console.log("call from getRecords");
     }
     $scope.getRequests=function(){
      $scope.pageChangeHandler(1);
      console.log("call from getRequests");
      };
      $scope.pageChangeHandler = function(num) {
        console.log(num,"num called");
        var recordsStatus;
        if($location.stat !== undefined)
        {
          recordsStatus = $location.stat;
          $scope.request.stats = $location.stat;
        }else
        {
          recordsStatus = $scope.request.stats;
        }
      
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
            params:{"status":recordsStatus,"page_no":num,"page_size":20}
            };//,"page_no":1,"page_size":20
            if(recordsStatus === "ALL")
            delete req1.params.status;

            console.log(req1,"req1");

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.message =false;
               $scope.stausReport = data.response.requests;
               $scope.pagination.total = data.response.total_count;
               //if (data.response.total_count === undefined)
                //$scope.pagination.total =10;

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
      $location.stat = obj.listzippr.status; 
      }
$scope.Resendpage= function(obj)
     {
      $location.resendObj = $scope.stausReport[obj];
      $state.go('resend');
      }



  }]);
