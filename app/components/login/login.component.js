// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `login`
//
angular.module('wr.components')
.component('login', {
    controller: 'login',
    templateUrl: __env.clientUrl + '/app/components/login/login.view.html',
});
}());
