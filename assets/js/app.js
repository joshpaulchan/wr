var webresponseApp = angular.module('webresponseApp', [ 'ngRoute', 'webresponseControllers', 'webresponseServices', 'webresponseDirectives']);

webresponseApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/messages', {
			templateUrl: 'partials/messages.html',
			controller: 'MessageCtrl'
		}).
		when('/messages/:messageId', {
			templateUrl: 'partials/messages.html',
			controller: 'MessageCtrl'
		}).
		when('/login', {
			templateUrl: 'partials/login.html',
			controller: 'LoginCtrl'
		}).
		otherwise({
			redirectTo: '/login'
		});
}]).run(['$route', '$rootScope', '$location', 'auth', function ($route, $rootScope, $location, auth) {
	$rootScope.$on('$routeChangeStart', function (event) {
        if (!auth.isLoggedIn()) {
            // console.log('DENY');
            $location.path('/login', true);
        }
    });

    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }
        return original.apply($location, [path]);
    };
}]);
