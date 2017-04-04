// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Import variables if present (from env.js) (thanks @jvandemo)
var env = {};
if (window) { env = window.__env; }

// Initialize app
angular.module('wr', ['ui.router', 'textAngular', 'angularModalService', 'wr.controllers', 'wr.services', 'wr.directives', 'wr.components', 'wr.pages'])
.constant('__env', env)
.constant('__token', 'SECRET-YEET') // FIXME: switch token to true php session token
.config(function($logProvider, $locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider, __env, __token) {
    // enable/disable angular debug
    $logProvider.debugEnabled(__env.enableDebug);

    // FIXME locationProvider
    // $locationProvider.html5Mode(true);

    // make trailing slashes optional
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
        .state('app', {
            url: "/",
            abstract: true,
        })
        .state('auth', {
            url: "",
            templateUrl: __env.clientUrl + "/app/templates/bare.html",
            abstract: true,
        })
        .state('auth.login', {
            url: "/login",
            template: "<login />",
        })
        .state('auth.register', {
            url: "/register",
            template: "<register />",
        })
        .state('auth.register-confirm', {
            url: "/register-confirm",
            templateUrl: __env.clientUrl + "/app/components/registerConfirm/registerConfirm.view.html",
        })
        .state('convos', {
            url: "/conversations",
            templateUrl: __env.clientUrl + "/app/templates/conversations.html",
            deepStateRedirect: true,
            requireAuth: true
        })
        .state('convos.convo', {
            url: "/{convoId}",
            views: {
                convo: {
                    template: "<convo/>"
                }
            },
            requireAuth: true
        })
        .state('users', {
            url: "/users",
            template : "<users />",
            requireAuth: true
        })
        .state('settings', {
            url: "",
            templateUrl: __env.clientUrl + "/app/pages/settings/settings.view.html",
            abstract: true,
            requireAuth: true
        })
        .state('settings.profile', {
            url: "/profile",
            template: "<profile />",
            requireAuth: true
        })
        .state('settings.templates', {
            url: "/templates",
            template: "<templates />",
            requireAuth: true
        });

    $urlRouterProvider.when('/', '/login');
    $urlRouterProvider.otherwise('/login');

    // automatically attach token to outgoing requests
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = __token;

    // JSON
    $httpProvider.defaults.headers.common['Content-Type'] = "application/json";
})
.run(['$rootScope', '$state', '$authService', function($rootScope, $state, $authService) {

    $rootScope.$on('$stateChangeStart', (evt, toState, toParams, fromState, fromParams) => {

        if (toState.requireAuth) {
            $authService.isLoggedIn()
                .then((loggedIn) => {
                    // redirect if un authenticated
                    if (!loggedIn) {
                        $state.go('auth.login');
                        evt.preventDefault();
                    }
                });
        }
    });

}]);

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
angular.module('wr.components', []);
angular.module('wr.pages', []);
}());
