
angular.module('consoles')
  .service('AuthService', function($q,$state,localStorageService) {
  'use strict';

  return {
    getStatus: function() {
      var dfd = $q.defer();
      var name = localStorageService.get("userName");
      if((name !=="")&&(name !==null))
      {
        dfd.resolve({
          name: 'Success'
        });
        
      }else
      {
        dfd.reject();
        localStorageService.clearAll();
        $rootScope.tab =1;
        $state.go("login");
      }
      return dfd.promise;
    }

  };
  
});