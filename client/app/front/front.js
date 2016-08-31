angular.module('spa.front', [])
.controller('FrontController', function($scope, Request, $window){
  $scope.articles=[];
  $scope.mult = false;
  $scope.multiReddit = [];
  $scope.listSub = false;

  $scope.getHot = function(){
    Request.getHot()
    .then(function(resp){
      if(resp.type === 'multi'){
        $scope.mult = true;
        $scope.multiReddit = resp.body;
      } else {
        $scope.articles = resp;
      }
    });
  };

  $scope.listSubRed = function(mul){
    $scope.articles = [];
    Request.multi(mul.sub)
    .then(function(resp){
      listSub = true;
      for(var sub in resp){
        resp[sub].forEach( function(article) {
          $scope.articles.push(article);
        });
      }

    });
  };

  $scope.link = function(article){
    $window.location.href =  article.url;
  };

  $scope.getHot();

});
