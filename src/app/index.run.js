(function() {
  'use strict';

  angular
    .module('consoles')
    .run(runBlock);

  /** @ngInject */
  function runBlock($window,$rootScope,$log,$state,$http,localStorageService) {
  	//$http.defaults.headers.common['x-zippr-sessiontoken'] = (localStorageService.get("sessiontoken") || '').toString() ;
    //$http.defaults.withCredentials =true;
    $log.debug('runBlock end');
    $rootScope.online = navigator.onLine;
     $window.addEventListener("offline", function () {
        $rootScope.$apply(function() {
          $rootScope.online = false;
           $log.debug("offline");
        });
      }, false);
      $window.addEventListener("online", function () {
        $rootScope.$apply(function() {
          $rootScope.online = true;
       });
      }, false);



    $rootScope.$on('$stateChangeError', 
    function(event, toState, toParams, fromState, fromParams, error){ 
      $state.go("login"); 
       });

     }

})();
