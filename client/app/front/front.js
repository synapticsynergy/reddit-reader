angular.module('spa.front', [])
.controller('FrontController', function($scope, Request){
  $scope.articles=[];

  $scope.getHot = function(){
    Request.getHot()
    .then(function(resp){
      $scope.articles = resp;
    })
  };

  $scope.getHot();

});
