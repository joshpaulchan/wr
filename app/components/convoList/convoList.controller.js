// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoList` CONTROLLER
// Controls the convo-list (conversation list pane), allowing for display of the
// conversations and bulk/singular book-keeping operations upon conversations.
//
// @pre     : the user must be logged-in
//
// @attr    : query             : String            : the search query [default: '']
// @attr    : isSearch          : Boolean           : whether a search is being
// performed or not [default: false]
// @attr    : filters           : Object            : the list of conversation
// filters
// @attr    : curFilter         : String            : the current filter being
// used [ default : the first defined filter in `filters` ]
// @attr    : curPage           : Number            : the current page being
// displayed up to in the conversation list [default: 0]
// @attr    : numItemsPerPage   : Number            : the number of
// conversations to display per page [default: 25]
// @attr    : convos            : Conversation[]    : the conversation objects [default: []]
// @attr    : selectedConvos    : String[]          : the ids of currently [default: []]
// selected conversation objects
//
// @method: loadConversations(pg)               : Loads the conversations from
// the server using the conersation service.
// @method: searchConvos()                      : Loads the conversations from
// the server using the conersation service.
// @method: loadNextPage()                      : Load the next page of
// conversation items (either during regular browsing or search).
// @method: byStatus(convo)                     : Works with `ng-repeat |
// filter` to filter the shown conversations in the list.
// @method: toggleSelect(convoId)               : Selects (or de-selects) an
// item depending on whether it is currently being selected.
// @method: selectAll()                         : Selects all the current
// conversations in scope.
// @method: deselectAll()                       : De-Selects all the
// conversations currently selected.
// @method: listButtonsDisabled()               : Checks whether the
// conversation list items shoudl be disabled or not.
// @method: openMarkModal()                     : Opens the 'Mark As' modal for
// marking a conversation/several conversations as a certain status (i.e. read,
// replied).
// @method: closeMarkModal()                    : Closes the 'Mark As' modal for
// marking a conversation/several conversations as a certain status (i.e. read,
// replied).
// @method: markConvos(convoIds, status)        : Uses the conversation list
// service to mark the given conversations (convoIds) with the given status
// (i.e. read/unread, unreplied/replied).
// @method: openMoveModal()                     : Opens the 'Move To' modal for
// selecting a folder (i.e inbox, trash, etc.) to move a conversation/several
// conversations to.
// @method: closeMoveModal()                    : Closes the 'Move To' modal for
// selecting a folder (i.e inbox, trash, etc.) to move a conversation/several
// conversations to.
// @method: moveConvos(convoIds, dest)          : Uses the conversation list
// service to move the given conversations to the specified destination folder.
// @method: viewConvo(convoId)                  : Use stateProvider to show the
// given conversation on screen
angular.module('wr.controllers')
.controller('convoList', function($scope, $state, $convoListService) {
    $scope.query = "";
    $scope.isSearch = false;
    $scope.filters = {
        "All": "@CONVERSATIONS__FILTER-ALL",
        "Unread": "@CONVERSATIONS__FILTER-UNREAD",
        "Unreplied": "@CONVERSATIONS__FILTER-UNREPLIED"
    };
    $scope.curFilter = $scope.filters[Object.keys($scope.filters)[0]];
    $scope.curPage = 0;
    $scope.numItemsPerPage = 25;
    $scope.convos = [];
    $scope.selectedConvos = new Set();
    var selectedConvo = null;

    ///////////////////////// DISPLAYING CONVERSATIONS /////////////////////////

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
    $scope.loadConversations = (pg) => {
        $convoListService
            .loadConvos(pg, $scope.numItemsPerPage)
            .then(
                (conversations) => {
                    $scope.convos = conversations;
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

    // `searchConvos()`
    // Loads the conversations from the server using the conersation service.
    //
    // @pre     : the conversation list service must be initialized
    // @pre     : `ev` must be a valid event object
    // @pre     : `query` must be a non-empty String
    // @pre     : `numItemsPerPage` must be a positive integer
    // @post    : [success] the search results (if any) will replace the current
    // items in the list
    // @post    : [success] the `isSearch` flag will be set to true
    // @post    : [success] the `query` and`numItemsPerPage` will saved to the
    // service, allowing `loadNextPage` to be used instead for the next few
    // results
    // @post    : [error] the `isSearch` flag will be set to false
    // @post    : [error] if other error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : query : String    : the term(s) to search for in the conversations
    // @param   : ev    : Event     : the event that triggered this function
    // @return  : null
    $scope.searchConvos = (query, ev) => {
        $convoListService
            .search(query, $scope.numItemsPerPage)
            .then(
                (conversations) => {
                    // set search flag to true
                    $scope.isSearch = true;
                    // load search results into scope
                    $scope.convos = conversations;
                },
                (err) => {
                    // log error and notify user
                    console.error(err);
                    // TODO: notify error for searchConvos and truncate query
                    // var formattedQuery = query;
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: `There was an error searching for '${formattedQuery}'.`
                    // });
                    // set search flag to false
                    $scope.isSearch  = false;
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

    // `byStatus(convo)`
    // Works with `ng-repeat | filter` to filter the shown conversations in the
    // list.
    //
    // @pre     : `convo` should be a valid conversation object to filter
    // @post    : true will be returned if the convo object meets the current
    // showing criteria (i.e. is unread, unreplied/all), false otherwise
    //
    // @param   : convo     : Conversation  : the conversation item to judge
    // @return  : Boolean   : whether or not `convo` should be shown
    $scope.byStatus = (convo) => {
        switch ($scope.curFilter) {
            case $scope.filters.Unread:
                return convo.status.unread;
            case  $scope.filters.Unreplied:
                return !convo.status.repliedTo;
            case $scope.filters.All:
                return true;
        }
        return flag;
    };

    ///////////////////////// SELECTING CONVERSATIONS /////////////////////////

    // `toggleSelect(convoId)`
    // Selects (or de-selects) an item depending on whether it is currently
    // being selected.
    //
    // @pre     : `convoId` must be a valid Conversation id
    // @pre     : `ev` must be a valid Event object
    // @post    : if convo is not selected, `convoId` will be selected (put into
    // the the array of selected convos)
    // @post    : if convo is selected, `convoId` will be de-selected and
    // removed from the array of selected convos
    //
    // @param   : convoId   : the id of the conversation to select
    // @param   : ev        : event object that triggered this
    // @return  : null
    $scope.toggleSelect = (convoId, ev) => {
        // prevent other event handlers on item from activating
        ev.stopPropagation();

        if ($scope.selectedConvos.has(convoId)) {   // remove if exists
            $scope.selectedConvos.delete(convoId);
        } else {                                    // add it if it doesn't
            $scope.selectedConvos.add(convoId);
        }
    };

    // `selectAll()`
    // Selects all the current conversations in scope.
    //
    // @pre     : null
    // @post    : all the conversations shown in the list will be selected
    //
    // @param   : null
    // @return  : null
    $scope.selectAll = () => {
        $scope.selectedConvos = new Set($scope.convos);
    };

    // `deselectAll()`
    // De-Selects all the conversations currently selected.
    //
    // @pre     : null
    // @post    : all currently selected conversations will be de-selected.
    //
    // @param   : null
    // @return  : null
    $scope.deselectAll = () => {
        $scope.selectedConvos.clear();
    };

    // `listButtonsDisabled()`
    // Checks whether the conversation list items should be disabled or not.
    //
    // @pre     : null
    // @post    : to be true, at least one conversation should be in view or
    // selected
    // @post    : to be false, not a single conversation must be "open" or
    // selected
    //
    // @param   : null
    // @return  : Boolean   : whether the list buttons should be active or not
    $scope.enableListButtons = () => {
        return ($scope.selectedConvos.size > 0);
    };

    ////////////////////////// MARKING CONVERSATIONS //////////////////////////

    // TODO: `openMarkModal()`
    // Opens the 'Mark As' modal for marking a conversation/several
    // conversations as a certain status (i.e. read, replied).
    //
    // @pre     : at least one conversation must be selected
    // @pre     : no other modal (including the Mark modal) should be open
    // @post    : [success] the modal will be 'opened' and visible on screen
    //
    // @param   : null
    // @return  : null
    $scope.openMarkModal = () => {
        // CODE IN HERE
    };

    // TODO: `closeMarkModal()`
    // Closes the 'Mark As' modal for marking a conversation/several
    // conversations as a certain status (i.e. read, replied).
    //
    //
    // @post    : [success] the Mark modal will become invisible and inactive
    //
    // @param   : null
    // @return  : null
    $scope.closeMarkModal = () => {
        // CODE IN HERE
    };

    // `markConvos(convoIds, status)`
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
    var markConvos = (convoIds, status) => {
        $convoListService
            .updateConvos(convoIds, { status : status })
            .then((data) => {
                // update view
                $scope.convos = $scope.convos.map((convo) => {
                    if ($scope.selectedConvos.has(convo.id)) {
                        convo.status = status;
                    }
                });
            }, (err) => {
                // log error and notify user
                console.error(err);
                // FIXME: uncomment this when notificaiton service is implemented
                // $notificationService.notify({
                //     type: "error",
                //     text: `There was an error marking the conversation(s) as ${status}`
                // });
            });
    };

    /////////////////////////// MOVING CONVERSATIONS ///////////////////////////

    // TODO: `openMoveModal()`
    // Opens the 'Move To' modal for selecting a folder (i.e inbox, trash, etc.)
    // to move a conversation/several conversations to.
    //
    // @pre     : at least one conversation must be selected
    // @pre     : no other modal (even the Move modal) should be open on screen
    // @post    : [success] the Mark modal will be opened and visible on screen
    //
    // @param   : null
    // @return  : null
    $scope.openMoveModal = () => {
        // CODE IN HERE
    };

    // TODO: `closeMoveModal()`
    // Closes the 'Move To' modal for selecting a folder (i.e inbox, trash,
    // etc.) to move a conversation/several conversations to.
    //
    // @post    : [success] the Move modal will be invisible and inactive
    //
    // @param   : null
    // @return  : null
    $scope.closeMoveModal = () => {
        // CODE IN HERE
    };

    // `moveConvos(convoIds, dest)`
    // Uses the conversation list service to move the given conversations to the
    // specified destination folder.
    //
    // @pre     : `convoIds` must be an array of valid conversation ids
    // @pre     : `dest` must be a valid string corresponding to a destination
    // folder to move the conversations to
    // @post    : [success] the conversations will be moved to the given folder
    // @post    : [error] the conversations will stay in their current
    // respective folders
    // @post    : [error] a notification will be logged with the error
    //
    // @param   : convoIds  : String[]  : id(s) of conversations to change
    // the status of
    // @param   : dest      : String    : the folder to move the
    // conversations(s) to
    // @return  : null
    var moveConvos = (convoIds, dest) => {
        $convoListService
            .updateConvos(convoIds, { location : dest })
            .then((data) => {
                // update view
                $scope.convos = $scope.convos.map((convo) => {
                    if ($scope.selectedConvos.has(convo.id)) {
                        convo.location = dest;
                    }
                });
            }, (err) => {
                // log error and notify user
                console.error(err);
                // FIXME: uncomment this when notificaiton service is implemented
                // $notificationService.notify({
                //     type: "error",
                //     text: `There was an error moving the conversation(s) to ${dest}`
                // });
            });
    };

    ////////////////////////// VIEWING CONVERSATIONS ///////////////////////////

    // `viewConvo(convoId)`
    // Use stateProvider to show the given conversation on screen.
    //
    // @pre     : a valid conversation id must be given
    // @post    : [success] the conversation will be shown on screen via the
    // convoPane
    // @post    : [success] the currently selected conversation will be
    // 'de-selected'
    // @post    : [success] the conversation will be 'selected'
    // @post    : [error] the currently viewed conversation will not change (if
    // any)
    // @post    : [error] an error notification will be logged and shown to the
    // user
    //
    // @param   : convoId   : String    : the id of the conversation to view
    // @return  : null
    $scope.viewConvo = (convo) => {
        if (selectedConvo === convo.id) { return; }
        if (selectedConvo) { $scope.selectedConvos.delete(selectedConvo); }
        // add to selected convos if not already selected
        selectedConvo = convo.id;
        convo.unread = false;
        $scope.selectedConvos.add(selectedConvo);
    };

    // Load messages when initialized
    $scope.loadConversations($scope.curPage);
});
}());
