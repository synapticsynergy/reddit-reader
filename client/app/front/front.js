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
        console.log('body ', resp.body);
        $scope.multiReddit = resp.body;
      } else {
        $scope.articles = resp;
      }
    });
  };

  $scope.listSubRed = function(mul){
    console.log(mul.sub);
    $scope.articles = [];
    Request.multi(mul.sub)
    .then(function(resp){
      console.log('resp, ', resp);
      listSub = true;
      for(var sub in resp){
        resp[sub].forEach( function(article) {
          $scope.articles.push(article);
        });
      }

    });
  };

  $scope.link = function(article){
    console.log('url is ', article.url);
    $window.location.href =  article.url;
  };

  $scope.getHot();

});
