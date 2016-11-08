// Written by Joshua Paul A. Chan
(function() {
"use strict";

// Initialize app
angular.module('wr', ['ui.router', 'wr.controllers', 'wr.services', 'wr.directives'])
.config(function($locationProvider, $stateProvider) {
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', { url: "/", abstract: true })
        .state('app.conversations', {
            url: "",
            templateUrl: "app/templates/conversations.html",
            controller: "convoListController"
        });
});

// Initialize modules
angular.module('wr.controllers', []);
angular.module('wr.services', []);
angular.module('wr.directives', []);
}());
