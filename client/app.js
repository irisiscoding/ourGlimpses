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
			templateUrl:'/partials/album'
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
		.when('/privacy', {
			templateUrl:'/partials/info/privacy.html'
		})
		.when('/terms', {
			templateUrl:'/partials/info/terms.html'
		})
		.when('/faq', {
			templateUrl:'/partials/info/faq.html'
		})

		.otherwise({
			redirectTo: '/'
		});
});
