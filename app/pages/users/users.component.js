// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoList` COMPONENT
//
angular.module('wr.pages')
.component('users', {
    templateUrl: __env.clientUrl + '/app/pages/users/users.view.html',
    controller: 'users'
});
}());
