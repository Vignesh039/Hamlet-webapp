angular.module('consoles')
  .controller('DisableController', ['$scope','$http', 'ZIPPR_ENVIRONMENT','localStorageService',"ModalService",'$modal','Messages',
    function ($scope,$http,ZIPPR_ENVIRONMENT,localStorageService,ModalService,$modal,Messages) {
      'use strict';
      $scope.cityList={};
      $scope.cityList.city="NONE";
      var featureGroup,drawGroup;
      var drawControl;
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
                              
              }else
              {
               $scope.message = data.error;
              }
           }).error(function(data) {
              console.log(data,"error data");
          });

      L.mapbox.accessToken = 'pk.eyJ1IjoiYXZ1Y2hpIiwiYSI6InlIcWxFWWcifQ.JnJCwFkMDgCfdVrOuSXaWw#11/19.0644/72.9849';
      var southWest = L.latLng(17.20376982191752,78.38607788085938),
      northEast = L.latLng(17.60083012593064,78.5302734375),
      bounds = L.latLngBounds(southWest, northEast);
      $scope.map =  L.mapbox.map('map', 'mapbox.streets',{maxBounds: bounds,maxZoom: 19,
       minZoom: 10
       });
      $scope.map.setView([17.353044912613186,78.48209023475647], 15);
       drawGroup = new L.FeatureGroup().addTo($scope.map);
       featureGroup =  new L.FeatureGroup().addTo($scope.map);
       
          drawControl = new L.Control.Draw({
          draw: {
          polyline: false,
          polygon: false,
          marker: false,
          rectangle:false,
          circle:false
          },
          edit: {featureGroup: drawGroup},
          remove: false
          });
          var fullscreenControl = new L.Control.Fullscreen().addTo($scope.map);

        //$scope.map.addControl(drawControl);
        $scope.map.setView([17.353044912613186,78.48209023475647], 12);
        $scope.map.on('draw:deleted',showDeletedPolygon);
        var myElements = document.querySelectorAll(".leaflet-draw-edit-edit");
           for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.visibility = "hidden";
            }
    }

    $scope.show = function() {
      //debugger;

      var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'confirmDisable.html',
      controller: 'Disablepolygon',
             resolve: {'$modalInstance': function() { return function() { return modalInstance; }; }
                
            }
    });
      modalInstance.result.then(function (response) {
            //$scope.selected = response;
            console.log(response,"response");
        }, function (str) {
          if(str === "success"){
            $scope.createErrorMessage=false;
            $scope.createMessage ="Polygon Disabled Successfully";
            }else{
               $scope.createMessage=false;
               $scope.createErrorMessage = str;
            }
        });
           
    };

    $scope.Alertshow = function() {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'Message.html',
      controller:'MessageDismiss',
      resolve: {'$modalInstance': function() { return function() { return modalInstance; }; }
           }
    });
    modalInstance.result.then(function (response) {
           //console.log(response,"response");
        }, function (str) {
          //console.log(str,"response");
        });
  };


      $scope.onCityChange = function(){
       
      if($scope.cityList.city !== "NONE")
      {
        $scope.onCity=true;
        $scope.createMessage=false;
        $scope.createErrorMessage=false;
        drawGroup.clearLayers();
        var req1 = {
            method: 'GET',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            params:{"city":$scope.cityList.city}
            };

             $http(req1).success(function(data) {
              if(data.ok === true)
              {
                      var obj = data.response;
                      //console.log(obj,"from server");
                      var finalGeometry = {"type":"FeatureCollection", "features": []}
                      for(var i in data.response){
                        var geo = data.response[i];
                        var feature = {
                          "type":"Feature",
                          "id":geo._id,
                          "properties": {"name": geo.name},
                          "geometry": geo.geometry,
                          "enabled":geo.enabled
                        };
                        finalGeometry.features.push(feature);
                        }
                      var layer1 = L.geoJson(finalGeometry, {
                      onEachFeature: function (feature, layer) {
                       featureGroup.addLayer(layer);
                       if (feature.enabled !== false)
                       {
                           layer.on('dblclick', function(e){
                            var shape = e.target.toGeoJSON();   
                            var shape_for_db = JSON.stringify(shape);
                            $scope.storeDb = JSON.parse(shape_for_db);
                            Messages.setData($scope.storeDb);
                            $scope.show();
                            });
                        }else
                        {
                          layer.on('dblclick', function(e){
                             $scope.Alertshow();
                             });
                        }

                      var content = feature.properties.name;
                      layer.bindPopup(content);
                       },
                      style: function(feature) {
                      if (feature.enabled === false)
                        return {fillColor: "#FF0000",color: '#FF0000',fillOpacity: 0.5};
                        else
                        return {fillColor: "#4CAF50",color: '#008000',fillOpacity: 0.5};
                         }
                       });

               }else{
                $scope.message = data.error.reason;
              }
           })
      }
     
          
      if($scope.cityList.city === "HYD")
      {
      featureGroup.clearLayers();
      var southWest = L.latLng(17.147351748174778,78.2281494140625),
      northEast = L.latLng(17.709444568316783,78.6785888671875),
      bounds = L.latLngBounds(southWest, northEast);
      $scope.map.options.maxBounds = bounds;
      $scope.map.fitBounds(bounds);
      //debugger;
      }

      if($scope.cityList.city === "BLR")
      {
      featureGroup.clearLayers();
      var southWest = L.latLng(12.846615538845874,77.50167846679688),
      northEast = L.latLng(13.092854552762695,77.64450073242188),
      bounds = L.latLngBounds(southWest, northEast);
      $scope.map.options.maxBounds = bounds;
      $scope.map.fitBounds(bounds);
      }

      if($scope.cityList.city === "DEL")
      {
      featureGroup.clearLayers();
      var southWest = L.latLng(28.41797549622403,76.86996459960938),
      northEast = L.latLng(28.881957139774222,77.24899291992188),
      bounds = L.latLngBounds(southWest, northEast);
      $scope.map.options.maxBounds = bounds;
      $scope.map.fitBounds(bounds);
      }

      
      
     }
        


        function showDeletedPolygon(e) {
          e.layers.eachLayer(function(layer) {
            var shape = layer.toGeoJSON();   
            var shape_for_db = JSON.stringify(shape);
            $scope.storeDb = JSON.parse(shape_for_db);
            Messages.setData($scope.storeDb);
            $scope.show();
            
          });
        };

        
       

    

  }]);
