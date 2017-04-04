// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `profile`
//
angular.module('wr.components')
.component('profile', {
    controller: 'profile',
    templateUrl: __env.clientUrl + '/app/components/profile/profile.view.html',
});
}());
