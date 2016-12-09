// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Import variables if present (from env.js) (thanks @jvandemo)
var env = {};
if(window){ env = window.__env; }

// Initialize app
angular.module('wr', ['ui.router', 'wr.controllers', 'wr.services', 'wr.directives', 'wr.components'])
.constant('__env', env)
.config(function($logProvider, $locationProvider, $stateProvider, $urlMatcherFactoryProvider, __env) {
    // enable/disable angular debug
    $logProvider.debugEnabled(__env.enableDebug);

    // FIXME locationProvider
    // $locationProvider.html5Mode(true);

    // make trailing slashes optional
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
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
        });
});

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
angular.module('wr.components', []);
}());
