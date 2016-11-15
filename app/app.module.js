// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Initialize app
angular.module('wr', ['ui.router', 'wr.controllers', 'wr.services', 'wr.directives', 'wr.components'])
.config(function($locationProvider, $stateProvider, $urlMatcherFactoryProvider) {
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
