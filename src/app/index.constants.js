 (function() {
  'use strict';

  angular
    .module('webapp')
    .constant('ZIPPR_CONSTANTS', {server: 'http://foo.zip.pr'})
    .constant('USER_ROLES', {
      admin: 'admin',
      public: 'public'
    });
    //The above constants are DUMMY. Remove and add your own.s
})();
