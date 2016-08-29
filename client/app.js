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
			templateUrl:'/partials/home.html'
		})
		.when('/album', {
			templateUrl:'/partials/album.html'
		})
		.when('/meet', {
			templateUrl:'/partials/meet.html'
		})
		.when('/favorite', {
			templateUrl:'/partials/favorite.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});
