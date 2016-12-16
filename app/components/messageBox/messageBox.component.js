// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoItem`
//
angular.module('wr.components')
.component('messageBox', {
    templateUrl: 'client/app/components/messageBox/messageBox.view.html',
    controller: 'messageBox',
    bindings: {
        placeholder : "@"
    }
});
}());
