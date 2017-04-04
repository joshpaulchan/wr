// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `userItem` COMPONENT
//
angular.module('wr.components')
.component('userItem', {
    bindings: {
        user : '<',
        buttons : '<'
    },
    templateUrl: __env.clientUrl + '/app/components/userItem/userItem.view.html',
});
}());
