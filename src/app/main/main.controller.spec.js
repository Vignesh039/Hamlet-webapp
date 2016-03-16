describe('controllers', function(){
  'use strict';
  var scope,HelloWorldController;

  beforeEach(module('webapp'));

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    HelloWorldController=$controller('MainController', {
    $scope: scope
    });
  }));

  //write your unit tests here
  it("a is true because it's true man",function(){
    var a=true;
    expect(a).toEqual(true);
  });

  it('should show title.', function() {
        expect(scope.showTitle == true);
    });
  

 it('title name testing', function () {
  expect(scope.title).toEqual("vignesh123");
  });

});



