(function() {
  'use strict';

  angular
    .module('consoles')
    .config(config);

  /** @ngInject */
  function config($logProvider,$httpProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    //$httpProvider.defaults.withCredentials = true;
    //delete $httpProvider.defaults.headers.common["Set-Cookie"];
    //$httpProvider.defaults.Access-Control-Allow-Credentials: true
    //$httpProvider.defaults.Set-Cookie :true

  }

})();
