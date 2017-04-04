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
    templateUrl: __env.clientUrl + '/app/components/unapprovedUserList/unapprovedUserList.view.html',
    controller: "unapprovedUserList"
});
}());
