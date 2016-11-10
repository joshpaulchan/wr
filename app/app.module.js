// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Initialize app
angular.module('wr', ['ui.router', 'wr.controllers', 'wr.services', 'wr.directives'])
.config(function($locationProvider, $stateProvider, $urlMatcherFactoryProvider) {
    // FIXME: $locationProvider.html5Mode(true);

    // make trailing slashes optional
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
        .state('conversations', {
            url: "/conversations",
            templateUrl: "client/app/templates/conversations.html",
            deepStateRedirect: true
        })
        .state('conversations.conversation', {
            url: "/{convoId}",
            views: {
                convo: {
                    templateUrl: "client/app/components/convo/convo.view.html",
                    controller: "convo"
                }
            }
        });
});

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
}());
