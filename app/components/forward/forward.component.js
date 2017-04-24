// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `forward`
//
angular.module('wr.components')
.component('forward', {
    controller: 'forward',
    bindings: {
        onclose : "<",
        convoId : "="
    },
    templateUrl: __env.clientUrl + '/app/components/forward/forward.view.html',
});
}());
