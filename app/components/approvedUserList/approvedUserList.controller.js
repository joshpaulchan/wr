// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `approvedUserList` CONTROLLER
// Controls the approvedUserList and supplies the userItem components with action buttons
//
// @pre     : the user must be logged-in
//
angular.module('wr.controllers')
.controller('approvedUserList', function($scope, $userService) {
    // DEFAULTS
    $scope.actions = [
        {
            text: "REVOKE ADMIN",
            class: "ay-lmao",
            show: (user) => { return true; },
            action: (user) => { revokeAdmin(user.id); }
        },
        {
            text: "GRANT ADMIN",
            class: "ay-lmao?",
            show: (user) => { return (user.admin === false); },
            action: (user) => { grantAdmin(user.id); }
        }
    ];

    /////////////////////////////// REVOKE ADMIN ///////////////////////////////

    /*
    // TODO: `revokeAdmin(user)`
    // Revokes the admin status of the target user.
    //
    // @pre     : the user submitting this request must be an admin herself
    // @pre     : `user` must be a valid user object
    // @post    : [success] the user's admin attribute will be set to false
    // @post    : [error] the user will retain her current status
    // @post    : [error] a notification will be logged with the error
    //
    // @param   : user  : Object  : user object whose permissions are being
    // revoked
    // @return  : null
    */
    var revokeAdmin = (user) => {
        // CODE IN HERE
    };

    /////////////////////////////// GRANT ADMIN ///////////////////////////////

    // TODO: `grantAdmin(user)`
    // Grants admin status to the target user.
    //
    // @pre     : the user submitting this request must be an admin herself
    // @pre     : `user` must be a valid user object
    // @post    : [success] the user's admin attribute will be set to true
    // @post    : [error] the user will retain her current status
    // @post    : [error] a notification will be logged with the error
    //
    // @param   : user      : Object  : user object whose permissions are being
    // upped
    // @return  : null
    var grantAdmin = (user) => {
        // CODE IN HERE
    };
});
}());
