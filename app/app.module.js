// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Initialize app
angular.module('wr', ['ui-router', 'wr.controllers', 'wr.services', 'wr.directives'])
.config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

})
.run(['$rootScope', 'authService', function($rootScope, authService) {

}]);

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
}());
