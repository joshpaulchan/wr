// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoItem`
//
angular.module('wr.components')
.component('convoItem', {
    bindings: {
        convo : '<',
        click : '=',
        select : '=',
        selected : '='
    },
    templateUrl: __env.clientUrl + '/app/components/convoItem/convoItem.view.html',
});
}());
