(function() {
  'use strict';

  angular
    .module('consoles')
    .run(runBlock);

  /** @ngInject */
  function runBlock($rootScope,$log,$state,$http,localStorageService) {
  	//$http.defaults.headers.common['x-zippr-sessiontoken'] = (localStorageService.get("sessiontoken") || '').toString() ;
    //$http.defaults.withCredentials =true;
    $log.debug('runBlock end');
    $rootScope.$on('$stateChangeError', 
    function(event, toState, toParams, fromState, fromParams, error){ 
      $state.go("login"); 
       });

     }

})();
