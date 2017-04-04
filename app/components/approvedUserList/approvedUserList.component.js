// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `approvedUserList` COMPONENT
//
angular.module('wr.components')
.component('approvedUserList', {
    bindings: {
        "users" : "<"
    },
    templateUrl: __env.clientUrl + '/app/components/approvedUserList/approvedUserList.view.html',
    controller: "approvedUserList"
});
}());
