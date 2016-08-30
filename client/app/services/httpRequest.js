angular.module('spa.httpRequest',[])
  .factory('Request', function($http, $window){

    var login = function(){
      return $http({
        method: 'GET',
        url: '/api/login'
      }).then(function(resp){
        $window.location.href = resp.data;
      });
    };

    var getHot = function(){
      return $http({
        method: 'GET',
        url: '/api/front'
      }).then(function(resp){
        return resp.data;
      });
    };

    return {
      login: login,
      getHot: getHot
    };

  });