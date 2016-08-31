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

    var multi = function(mul){
      return $http({
        method: 'POST',
        url: '/api/multi',
        data: JSON.stringify({
          multi: mul})
      }).then(function(resp){
        console.log('res ', resp.data);
        return resp.data;
      });
    };

    return {
      login: login,
      getHot: getHot,
      multi: multi
    };

  });