// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `unapprovedUserList` COMPONENT
//
angular.module('wr.components')
.component('unapprovedUserList', {
    bindings: {
        "users" : "<"
    },
    templateUrl: 'client/app/components/unapprovedUserList/unapprovedUserList.view.html',
    controller: "unapprovedUserList"
});
}());
