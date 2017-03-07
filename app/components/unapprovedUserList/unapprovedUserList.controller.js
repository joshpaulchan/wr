// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `approvedUserList` CONTROLLER
// Controls the approvedUserList and supplies the userItem components with action buttons
//
// @pre     : the user must be logged-in
//
angular.module('wr.controllers')
.controller('unapprovedUserList', function($scope, $authService, $userService) {
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
            text: "GRANT APPROVAL",
            class: "btn--outline btn--warning",
            show: (user) => { return  curUserIsAdmin && !isApproved(user); },
            action: (user) => { grantApproval(user); }
        }
    ];

    ////////////////////////////// GRANT APPROVAL //////////////////////////////

    // `grantApproval(user)`
    // Approves the target user for regular use.
    //
    // @pre     : the user submitting this request must be an admin herself
    // @pre     : `user` must be a valid user object
    // @post    : [success] the user's approved attribute will be set to true
    // @post    : [error] the user will retain her current status
    // @post    : [error] a notification will be logged with the error
    //
    // @param   : user  : Object    : user object whose permissions are being
    // upped
    // @return  : null
    var grantApproval = (user) => {
        // CODE IN HERE
        console.log(`Granting approval for: ${user.email}.`);
        $authService.approveUser(user.id)
            .then(
                (resp) => {
                    user.approved = true;
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
