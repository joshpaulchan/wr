// Written by Joshua Paul A. Chan
(function() {
"use strict";

angular.module('wr.components')
.component('messageBox', {
    templateUrl: 'client/app/shared/messageBox/messageBox.view.html',
    controller: 'messageBox',
    bindings: {
        placeholder : "@",
        message : "="
    }
});
}());
