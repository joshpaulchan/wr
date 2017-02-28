// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `users` CONTROLLER
//
angular.module('wr.controllers')
.controller('users', function($userService) {
    var $ctrl = this;

    // TODO: use modalService

    ////////////////////////////// REMOVING USERS //////////////////////////////

    // TODO: `openRemoveModal()`
    // Opens the 'Remove As' modal for marking a conversation/several
    // conversations as a certain status (i.e. read, replied).
    //
    // @pre     : at least one conversation must be selected
    // @pre     : no other modal (including the Remove modal) should be open
    // @post    : [success] the modal will be 'opened' and visible on screen
    //
    // @param   : null
    // @return  : null
    $ctrl.openRemoveModal = () => {
        // CODE IN HERE
    };

    // TODO: `closeRemoveModal()`
    // Closes the 'Remove As' modal for marking a conversation/several
    // conversations as a certain status (i.e. read, replied).
    //
    //
    // @post    : [success] the Remove modal will become invisible and inactive
    //
    // @param   : null
    // @return  : null
    $ctrl.closeRemoveModal = () => {
        // CODE IN HERE
    };

    // TODO: `removeUser(user)`
    // Uses the conversation list service to mark the given conversations
    // (convoIds) with the given status (i.e. read/unread, unreplied/replied).
    //
    // @pre     : `convoIds` must be an array of valid conversation ids
    // @pre     : `status` must be a valid string corresponding to a status a
    // conversation can be marked as
    // @post    : [success] the conversations will be set to the given status
    // @post    : [error] the conversations will all retain their current status
    // @post    : [error] a notification will be logged with the error
    //
    // @param   : convoIds  : String[]  : id(s) of conversations to change
    // the status of
    // @param   : status    : String    : the status to change the
    // conversation(s) to
    // @return  : null
    var removeUser = (user) => {
        // CODE IN HERE
    };
});
}());
