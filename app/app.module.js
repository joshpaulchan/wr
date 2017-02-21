// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Import variables if present (from env.js) (thanks @jvandemo)
var env = {};
if (window) { env = window.__env; }

// Initialize app
angular.module('wr', ['ui.router', 'textAngular', 'angularModalService', 'wr.controllers', 'wr.services', 'wr.directives', 'wr.components'])
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
            templateUrl: "client/app/templates/bare.html",
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
        .state('convos', {
            url: "/conversations",
            templateUrl: "client/app/templates/conversations.html",
            deepStateRedirect: true
        })
        .state('convos.convo', {
            url: "/{convoId}",
            views: {
                convo: {
                    template: "<convo/>"
                }
            }
        }) // TODO: Settings page
        .state('settings', {
            url: "/settings",
            templateUrl: "client/app/templates/bare.html",
            deepStateRedirect: true
        });

    $urlRouterProvider.when('/', '/login');

    // automatically attach token to outgoing requests
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = __token;
});

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
angular.module('wr.components', []);
}());
