// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `users` CONTROLLER
//
angular.module('wr.controllers')
.controller('users', function($scope, $state, $userService) {

    $scope.users = [];

    $scope.curPage = 0;

    ///////////////////////// DISPLAYING USERS /////////////////////////

    // `loadConversations(pg)`
    // Loads the conversations from the server using the conersation service.
    //
    // @pre     : the conversation list service must be initialized
    // @pre     : `pg` must be a non-negative integer
    // @pre     : `numItemsPerPage` must be a positive integer
    // @post    : [success] the `numItemsPerPage` will saved to the service,
    // allowing `loadNextPage` to be used instead
    // @post    : [success] the conversations will replace the current convos
    // @post    : [error] if no more items (pg > LAST_PAGE), do nothing
    // @post    : [error] if other error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : pg    : Number    : the page number of the converations to get
    // @return  : null
    $scope.loadApprovedUsers = (pg) => {
        $userService
            .loadApprovedUsers(pg, $scope.numItemsPerPage)
            .then(
                (users) => {
                    $scope.users = users;
                    $scope.$apply();                // update angular
                },
                (err) => {
                    console.error(err);
                    // FIXME: uncomment when notification service is implemented
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: "There was an error loading the conversations from the server."
                    // });
                });
    };

    // TODO: `loadNextPage()`
    // Load the next page of conversation items (either during regular browsing
    // or search).
    //
    // @pre     : the conversation list service must be initialized
    // @pre     : [success] Either a search through the conversations or a
    // conversation page load must have been completed previously (to save the
    // default number of pages and current page in the conversation list
    // service)
    // @post    : [success] the next page of conversations will be appended to
    // the current list of conversations
    // @post    : [error] the current conversation list will not be mutated in
    // any way
    // @post    : [error] if other error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : null
    // @return  : null
    $scope.loadNextPage = () => {
        // CODE IN HERE
    };

    ///////////////////////////// APPROVING USERS /////////////////////////////

    // TODO: `approveUser()`
    // Opens the 'Move To' modal for selecting a folder (i.e inbox, trash, etc.)
    // to move a conversation/several conversations to.
    //
    // @pre     : at least one conversation must be selected
    // @pre     : no other modal (even the Move modal) should be open on screen
    // @post    : [success] the Mark modal will be opened and visible on screen
    //
    // @param   : null
    // @return  : null
    $scope.approveUser = (user) => {
        // CODE IN HERE
    };

    // Load messages when initialized
    $scope.loadApprovedUsers($scope.curPage);
});
}());
