// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `register`
//
angular.module('wr.components')
.component('register', {
    controller: 'register',
    templateUrl: __env.clientUrl + '/app/components/register/register.view.html',
});
}());
