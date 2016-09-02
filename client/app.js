var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'/partials/main.html',
			controller: 'loginController'
		})
		.when('/register', {
			templateUrl:'/partials/register.html',
			controller: 'registerController'
		})
		.when('/home', {
			templateUrl:'/partials/home.html',
			controller: 'wallpostsController'
		})
		.when('/album', {
			templateUrl:'/partials/album.html',
            controller: 'albumController'
        })
        .when('/addAlbum', {
            templateUrl:'/partials/album_add.html',
            controller: 'albumController'
        })
		.when('/meet', {
			templateUrl:'/partials/meet.html'
		})
		.when('/favorite', {
			templateUrl:'/partials/favorite.html'
		})
		.when('/about', {
			templateUrl:'/partials/info/about.html'
		})
		.when('/faq', {
			templateUrl:'/partials/info/faq.html'
		})
		.when('/privacy', {
			templateUrl:'/partials/info/privacy.html'
		})
		.when('/term', {
			templateUrl:'/partials/info/term.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
myApp.directive('file', function() {
  return {
    restrict: 'AE',
    scope: {
      file: '@'
    },
    link: function(scope, el, attrs){
      el.bind('change', function(event){
        var files = event.target.files;
        var file = files[0];
        scope.file = file;
        scope.$parent.file = file;
        scope.$apply();
      });
    }
  };
});
