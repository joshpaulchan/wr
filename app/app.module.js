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
        .state('auth.register-confirm', {
            url: "/register-confirm",
            templateUrl: "client/app/components/registerConfirm/registerConfirm.view.html",
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
        })
        .state('users', {
            url: "/users",
            template : "<users />"
        })
         // TODO: Settings page
        .state('settings', {
            url: "/settings",
            templateUrl: "client/app/templates/bare.html",
            deepStateRedirect: true
        });

    $urlRouterProvider.when('/', '/login');

    // automatically attach token to outgoing requests
    $httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = __token;

    // JSON
    $httpProvider.defaults.headers.common['Content-Type'] = "application/json";
});

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
angular.module('wr.components', []);
angular.module('wr.pages', []);
}());
