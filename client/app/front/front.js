angular.module('spa.front', [])
.controller('FrontController', function($scope, Request, $window){
  $scope.articles=[];

  $scope.getHot = function(){
    Request.getHot()
    .then(function(resp){
      $scope.articles = resp;
    })
  };

  $scope.link = function(article){
    console.log('url is ', article.url);
    $window.location.href =  article.url;
  };

  $scope.getHot();

});
