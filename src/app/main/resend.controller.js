
angular.module('consoles')
.controller('resendController', ['$scope','$http','$state', 'ZIPPR_ENVIRONMENT','$location','localStorageService',"ModalService",'$modal','Messages',
    function ($scope,$http,$state,ZIPPR_ENVIRONMENT,$location,localStorageService,ModalService,$modal,Messages) {
      'use strict';
     var session = localStorageService.get("sessiontoken");
     var featureGroup,drawControl;
     if($location.resendObj === undefined)
     {
      $state.go('requests');
    }else
    {
      console.log($location.resendObj,"$location.resendObj");
      initializeMap();
    }
    function initializeMap()
    {
     $scope.idReport = $location.resendObj;
     L.mapbox.accessToken = 'pk.eyJ1IjoiYXZ1Y2hpIiwiYSI6InlIcWxFWWcifQ.JnJCwFkMDgCfdVrOuSXaWw#11/19.0644/72.9849';
        $scope.map =L.mapbox.map('map', 'mapbox.streets');
        var centerPoint = $scope.idReport.geometry.coordinates[0][0];
        $scope.map.setView([centerPoint[1],centerPoint[0]], 17);
        featureGroup =  new L.FeatureGroup().addTo($scope.map);
        drawControl = new L.Control.Draw({
          draw: {
          polyline: false,
          polygon: false,
          marker: false,
          rectangle:false,
          circle:false
          },
          edit: {featureGroup: featureGroup}
          });
        $scope.map.addControl(drawControl);

       var finalGeometry = {"type":"FeatureCollection", "features": []}
       var geo = $scope.idReport;
       var feature = {
       "type":"Feature",
       "id":geo._id,
       "properties": {"name": geo.name},
       "geometry": geo.geometry
       };
       finalGeometry.features.push(feature);
       var layer1 = L.geoJson(finalGeometry, {
       onEachFeature: function (feature, layer) {
       featureGroup.addLayer(layer);
       var content = feature.properties.name;
       layer.bindPopup(content);
       },style: function(feature) {
         return {fillColor: "#4CAF50",color: '#000000',opacity: 0.3};
         }
        });
       $scope.map.on('draw:edited' ,showPolygonAreaEdited);
        var myElements = document.querySelectorAll(".leaflet-draw-edit-remove");
           for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.visibility = "hidden";
            }
            $location.resendObj = undefined;
    }

    function showPolygonAreaEdited(e) {
          e.layers.eachLayer(function(layer) {
            var shape = featureGroup.toGeoJSON();   
            var shape_for_db = JSON.stringify(shape);
            $scope.storeDb = JSON.parse(shape_for_db);
            Messages.setData($scope.storeDb);
            $scope.show();
            
          });
        };

        $scope.show = function() {
        var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'resendpolygon.html',
        controller: 'Resendpolygon',
               resolve: {'$modalInstance': function() { return function() { return modalInstance; }; }
                  
              }
          });
          modalInstance.result.then(function (response) {
                //$scope.selected = response;
                console.log(response,"response");
            }, function (str) {
              if(str === "success"){
                $scope.Errormessage=false;
                $scope.createMessage ="Successfully Polygon updated";
                }else{
                   $scope.createMessage=false;
                   $scope.Errormessage = str;
                }
        });
           
    };

  

  }]);
