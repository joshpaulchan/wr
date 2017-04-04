// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoItem`
//
angular.module('wr.components')
.component('message', {
    bindings : {
        sender  : "<",
        sent    : "<",
        body    : "<",
    },
    templateUrl: __env.clientUrl + '/app/components/message/message.view.html',
});
}());
