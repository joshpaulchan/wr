// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `approvedUserList` CONTROLLER
// Controls the approvedUserList and supplies the userItem components with action buttons
//
// @pre     : the user must be logged-in
//
angular.module('wr.controllers')
.controller('approvedUserList', function($scope, $authService, $userService) {
    // DEFAULTS

    // Check if a user is an admin or not
    //
    // @param   : u     : Object    : user object to check admin status
    // @return  : bool  : true if the user is an admin, false otherwise
    var isAdmin = (u) => u.admin === true;

    // Check if a user has been approved to use web response or not
    //
    // @param   : u     : Object    : user object to check approval status
    // @return  : bool  : true if the user has approval, false otherwise
    var isApproved = (u) => u.approved === true;

    var curUserIsAdmin = isAdmin($authService.getUser());

    $scope.actions = [
        {
            text: "REVOKE ADMIN",
            class: "btn--outline btn--danger",
            show: (user) => { return curUserIsAdmin && isApproved(user) && isAdmin(user); },
            action: (user) => { revokeAdmin(user); }
        },
        {
            text: "GRANT ADMIN",
            class: "btn--outline btn--success",
            show: (user) => { return  curUserIsAdmin && isApproved(user) && !isAdmin(user); },
            action: (user) => { grantAdmin(user); }
        }
    ];

    /////////////////////////////// REVOKE ADMIN ///////////////////////////////

    // `revokeAdmin(user)`
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
    var revokeAdmin = (user) => {
        // CODE IN HERE
        console.log(`Revoking admin status for: ${user.email}.`);

        $authService.deescalateUser(user.id)
            .then(
                (resp) => {
                    user.admin = false;
                    $scope.$apply();
                }, (err) => {
                    console.error(err);
                    // FIXME: uncomment when notification service is implemented
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: "There was an error revoking the admin status of the user."
                    // });
                });
    };

    /////////////////////////////// GRANT ADMIN ///////////////////////////////

    // `grantAdmin(user)`
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
        console.log(`Granting admin status for: ${user.email}.`);
        $authService.escalateUser(user.id)
            .then(
                (resp) => {
                    user.admin = true;
                    $scope.$apply();
                }, (err) => {
                    console.error(err);
                    // FIXME: uncomment when notification service is implemented
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: "There was an error revoking the admin status of the user."
                    // });
                });
    };
});
}());
