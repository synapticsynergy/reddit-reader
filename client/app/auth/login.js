angular.module('spa.login', [])
.controller('LoginController', function($scope, Request){

  $scope.login = function(){
    Request.login()
    .then(function(res) {
    });
  };
});