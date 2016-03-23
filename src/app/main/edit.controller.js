
angular.module('consoles')
  .controller('editController', ['$scope','$location','localStorageService', '$state','ZIPPR_ENVIRONMENT','$http',
    function ($scope,$location,localStorageService,$state,ZIPPR_ENVIRONMENT,$http) {
      'use strict';
     var session = localStorageService.get("sessiontoken");
     console.log($location.id,$location.stat,"$location");
     var req1 = {
            method: 'GET',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/request/"+String($location.id),
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            }
            };
             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.message =false;
               $scope.idReport = data.response;
               initializeMap();
               }else
              {
               $scope.message = data.error.reason;
              }
           }).error(function(data,status) {
              $scope.message =status+" Page Not Found";
           });
     
    $scope.onApprove=function(){
    	console.log("request approved");
    	var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/approve",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },data:{
              "neighbourhood_draft_id":String($location.id)
               }

            };
             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.errormessage =false;
               $scope.sucessmessage = data.response;
               }else
              {
              	$scope.sucessmessage = false;
               $scope.errormessage = data.error.reason;
              }
           }).error(function(data,status) {
              $scope.errormessage = status+" Page Not Found";
           });

    }
    $scope.onReject=function(){
    	console.log("request rejected");
    	var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/reject",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:{
              "neighbourhood_draft_id":String($location.id)
               }

            };
             $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.errormessage =false;
               $scope.sucessmessage = data.response;
               }else
              {
              	$scope.sucessmessage = false;
               $scope.errormessage = data.error.reason;
              }
           }).error(function(data,status) {
              $scope.errormessage = status+" Page Not Found";
           });
    }

	      function initializeMap(){
	      	 var userType = localStorageService.get("userType");
	      	if(($location.stat === "PENDING")&&(userType ==="hamlet_manager"))
	      	{
	      		$scope.Managers = true;
	      	}else
	      	{
	      		$scope.Managers = false;
	      	}


	      L.mapbox.accessToken = 'pk.eyJ1IjoiYXZ1Y2hpIiwiYSI6InlIcWxFWWcifQ.JnJCwFkMDgCfdVrOuSXaWw#11/19.0644/72.9849';
	      $scope.map =L.mapbox.map('map', 'mapbox.streets');
	      var centerPoint = $scope.idReport.geometry.coordinates[0][0];
	  	  $scope.map.setView([centerPoint[1],centerPoint[0]], 17);
	 	  var featureGroup =  new L.FeatureGroup().addTo($scope.map);
	  	  var finalGeometry = {"type":"FeatureCollection", "features": []}
	                   for(var i in $scope.idReport){
	                        var geo = $scope.idReport;
                        var feature = {
                          "type":"Feature",
                          "id":geo._id,
                          "properties": {"name": geo.name},
                          "geometry": geo.geometry
                        };
                        finalGeometry.features.push(feature);
                        }

                      var layer1 = L.geoJson(finalGeometry, {
                      onEachFeature: function (feature, layer) {
                      featureGroup.addLayer(layer);
                      var content = feature.properties.name;
                      layer.bindPopup(content);
                       },
                      style: function(feature) {
                      return {fillColor: "#4CAF50",color: '#000000',opacity: 0.3};
                      }
        });
	  
     

    }

  }]);
