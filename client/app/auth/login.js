angular.module('spa.login', [])
.controller('LoginController', function($scope, Request){

  $scope.login = function(){
    console.log('login button clicked');
    Request.login()
    .then(function(res) {
      console.log('user logged in');
    });
  };
});