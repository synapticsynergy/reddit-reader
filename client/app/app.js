angular.module('spa',['spa.home',
    'spa.login',
    'spa.httpRequest',
    'spa.front',
    'ui.router',
    'ngRoute',
    'ui.bootstrap',
    'ngLodash',
    'ngTouch'
])
.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    //sets default state when the app is booted
    $urlRouterProvider
      .when('login', '/login')
      .when('front', '/front')
      .when('home', '/home')
      .otherwise('/home');

    $locationProvider.html5Mode(true);
    //the form state that allows users to create their request
    $stateProvider
      //functionality states
      .state('login', {
        url: '/login',
        templateUrl: 'app/auth/login.html',
        controller: 'LoginController'
      })
      .state('front', {
        url: '/front',
        templateUrl: 'app/front/front.html',
        controller: 'FrontController'
      })
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      });

  });