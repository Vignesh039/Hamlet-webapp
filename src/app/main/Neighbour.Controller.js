angular.module('consoles')
  .controller('NeighbourController', ['$scope','$http', 'ZIPPR_ENVIRONMENT','localStorageService',
    function ($scope,$http, ZIPPR_ENVIRONMENT,localStorageService) {
      'use strict';
      $scope.cityList={};
      $scope.neiForm={};
      $scope.neiForm.country="India";
      $scope.cityList.city="NONE";
      var drawControl;
      var featureGroup,drawGroup;
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

             $http(req1).success(function(data,status,headers,config) {
              if(data.ok === true)
              {
                $scope.citiesList=data.response;
                  console.log($scope.citiesList,"$scope.citiesList");            
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
       featureGroup =  new L.FeatureGroup().addTo($scope.map);
       drawGroup = new L.FeatureGroup().addTo($scope.map);
        drawControl = new L.Control.Draw({
          draw: {
          polyline: false,
          marker: false,
          rectangle:false,
          circle:false
          },
          edit: {featureGroup: drawGroup}
          });
        var fullscreenControl = new L.Control.Fullscreen().addTo($scope.map);

        $scope.map.addControl(drawControl);
        $scope.map.setView([17.353044912613186,78.48209023475647], 12);
        $scope.map.on('draw:created',showPolygonAreaCreated);
        $scope.map.on('draw:edited' ,showPolygonAreaEdited);
        $scope.map.on('draw:deleted',showDeletedPolygon);
    }
    
      $scope.createNewNeighbor = function(){
      if($scope.cityList.city !== "NONE")
      {
        var index = document.getElementById('cityList').selectedIndex;
        $scope.neiForm.city=$scope.citiesList[index].name;
        $scope.neiForm.state=$scope.citiesList[index].state;
        $scope.onCity=true;
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
                      console.log(obj.length,"data from server")
                      var finalGeometry = {"type":"FeatureCollection", "features": []}
                      for(var i in data.response){
                        var geo = data.response[i];
                        var feature = {
                          "type":"Feature",
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
                      //updateLayer();
                      },
                      style: function(feature) {
                      return {fillColor: "#4CAF50",color: '#000000'};
                      }
                       });

               }else{
                $scope.message = data.error.reason;
              }
           })
      }else{
         $scope.onCity=false;
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

        function showPolygonAreaEdited(e) {
          e.layers.eachLayer(function(layer) {
            var shape = drawGroup.toGeoJSON();   
            var shape_for_db = JSON.stringify(shape);
            $scope.storeDb = JSON.parse(shape_for_db);
            console.log($scope.storeDb,"In osm map polygon edited");
          });
        };

        function showPolygonAreaCreated(e) {
           drawGroup.addLayer(e.layer);
           var shape = drawGroup.toGeoJSON();   
           var shape_for_db = JSON.stringify(shape);
           $scope.storeDb = JSON.parse(shape_for_db);
           var myElements = document.querySelectorAll(".leaflet-draw-draw-polygon");
           for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.visibility = "hidden";
            }
           console.log("In osm map polygon created");
        };

        function showDeletedPolygon(e){
           var shape = drawGroup.toGeoJSON();   
           var shape_for_db = JSON.stringify(shape);
           $scope.storeDb = JSON.parse(shape_for_db);
           var myElements = document.querySelectorAll(".leaflet-draw-draw-polygon");
           for (var i = 0; i < myElements.length; i++) {
            myElements[i].style.visibility = "visible";
            }
           console.log($scope.storeDb,"In osm map polygon deleted");
         } 
       

    $scope.createNeighbour=function(){
      //console.log($scope.cityList.city,"$scope.cityList.city");
      if (typeof $scope.storeDb === "object") 
        {
      var req1 = {
            method: 'POST',
            url: ZIPPR_ENVIRONMENT.server+"hamlet/nadmin/neighbourhoods/add",
            headers:{"Content-Type":"application/json",
                     "x-hamlet-api-key":ZIPPR_ENVIRONMENT.apikey,
                     "x-hamlet-sessiontoken":session
            },
            data:{  "city": $scope.cityList.city,
                    "name": $scope.neiForm.area,
                    "properties": {
                    "locality": $scope.neiForm.locality,
                    "subLocalit": $scope.neiForm.sublocality,
                    "city": $scope.neiForm.city,
                    "district": $scope.neiForm.district,
                    "state": $scope.neiForm.state,
                    "country": $scope.neiForm.country
                },"geometry":$scope.storeDb.features[0].geometry
            }
            };

            $http(req1).success(function(data) {
              if(data.ok === true)
              {
               $scope.createErrorMessage=false;
               $scope.createMessage ="Successfully Polygon Created";
               $scope.neiForm.sub=true;
               $scope.map.removeControl(drawControl);
               }else
              {
               $scope.createMessage=false;
               $scope.createErrorMessage = data.error.reason;
              }
           }).error(function(data) {
              console.log(data,"error data");
           });
         }else
         {
          $scope.createErrorMessage ="Draw new Polygon on Map Then save";
         }
     
     }


  }]);
