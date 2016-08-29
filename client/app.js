var myApp = angular.module('myApp', ['ngRoute', 'ngMessages']);

myApp.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl:'/partials/main.html'
		})
		.when('/register', {
			templateUrl:'/partials/register.html'
		})
		.when('/home', {
			templateUrl:'/partials/home.html'
		})
		.when('/album', {
			templateUrl:'/partials/album'
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
