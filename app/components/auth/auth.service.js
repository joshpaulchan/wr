// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `$convoService` SERVICE
// Defines methods for authenticating users by logging them in, de-authing by
// logging them out, and submitting registration applications.
//
// @pre     : networking libs must be initialized
//
// @attr    : apiUrl        : String    : base API url of the resource
//
//
angular.module('wr.services')
.service('$authService', ['$http', '__env', function($http, __env) {
    var service = this;
    service.apiURL = __env.apiUrl + '/auth';


    return service;
}]);
}());
