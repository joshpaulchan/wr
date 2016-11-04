'use strict';

// `convoListPane`
// Controls the convo-list (conversation list pane) in displaying the
// conversations and do bulk/singular slection, move, and mark opeartions
//
// @pre     : the user must be logged-in
//
// @attr    : query             : String            : the search bar query
// @attr    : filters           : Object            : the list of conversation
// filters
// @attr    : curFilter         : String            : the current filter being
// used [ default : the first defined filter in `filters` ]
// @attr    : curPage           : Number            : the current page being
// displayed up to in the conversation list
// @attr    : numItemsPerPage   : Number            : the number of
// conversations to display per page
// @attr    : convos            : Conversation[]    : the conversation objects
//
// @method  : loadConversations : null              : loads the conversations
// from the server using the conersation service

// @method  : markAs            : null              : mark conversations as

// TODO: add options to mark conversations as
// TODO: add options to move conversations to
// TODO: finish adding method stubs

angular.module('wrControllers')
.controller('convoListPane', function($scope, $location, convoService, errorService) {
    $scope.query = "";
    $scope.filters = {
        "All"       : "@CONVERSATIONS__FILTER-ALL",
        "Unread"    : "@CONVERSATIONS__FILTER-UNREAD",
        "Unreplied" : "@CONVERSATIONS__FILTER-UNREPLIED"
    };
    $scope.curFilter = $scope.filters[Object.keys($scope.filters)[0]];
    $scope.curPage = 0;
    $scope.numItemsPerPage = 25;
    $scope.convos = [];

    // Load messages when initialized
    $scope.$on(convoService.isReady, () => {
        $scope.loadConversations($scope.curPage);
    });

    // `loadConversations(pg)`
    // Loads the conversations from the server using the conersation service
    //
    // @pre     : the conversation service must be initialized
    // @pre     : the user must be logged in
    // @pre     : pg must be a non-negative integer
    // @post    : [success] the numItemsPerPage will saved to the service,
    // allowing `loadNextPage` to be used instead
    // @post    : [success] the conversations will be sent to the scope
    // @post    : [error] if no more items (pg > LAST_PAGE), do nothing
    // @post    : [error] if other error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : pg    : Number    : the page number of the converations to get
    // @return  : null
    $scope.loadConversations = function(pg) {
        convoService.loadMessages($scope.curPage, $scope.numItemsPerPage)
        .then(
            (conversations) => { $scope.convos = conversations; },
            (err) => {
            // TODO: implement error service + error notification directive
            errorService.addError(err);
        });
    };

    ///////////////////////////
    // MESSAGE LIST CONTROLS //
    ///////////////////////////

    $scope.openMarkModal = () => {

    };

    $scope.openMoveModal = () => {

    };

    $scope.markConvoss = (convoIds, status) => {

    };

    $scope.moveConvoss = (convoIds) => {

    };

    $scope.showConvo = (convoId) => {

    };

    $scope.markAs = function() {
        //
    }

    $scope.moveMessageTo = function(message, dest) {
        message.folder = dest;
    };

    $scope.byStatus = function(message) {
        var flag = true;
        switch ($scope.show) {
            case "Unread":
                flag = message.status.unread;
                break;
            case "unreplied":
                flag = !message.status.repliedTo;
                break;
            case "All":
                break;
        }
        return flag;
    };

    $scope.disableDropdown = function() {
        var selectedMessages = $scope.getSelected();
        var curMessage = messages.getCurMessage();
        return (selectedMessages === 0 && curMessage === null);
    };

    ////////////////////////////////
    // MESSAGE LIST-ITEM CONTROLS //
    ////////////////////////////////

    $scope.getSelected = function() {
        return $scope.messages.filter(function(message) {
            return (message.status.selected);
        });
    };

    $scope.curMessage = messages.curMessage;
    $scope.forwardPressed = false;

    $scope.$watch(function() {
        return ($scope.curMessage !== messages.curMessage);
    }, function(newMessage, oldMessage, scope) {
        $scope.curMessage = messages.curMessage;
        $scope.forwardPressed = false;
    });
    $scope.clearSelected = function() {
        $scope.messages = $scope.messages.map(function(message, i) {
            message.status.selected = false;
            return (message);
        });
    };

    $scope.viewMessage = function(message) {
        // 1. set is as new message
        if (messages.getCurMessage() !== message) {
            messages.setCurMessage(message);
        } else {
            messages.setCurMessage(null);
        }

        // 2. change path
        var pathId = (!!messages.getCurMessage()) ? ("/" + message.id) : "";
        $location.path("/messages" + pathId, false);
    };
});
