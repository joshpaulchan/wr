// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convo`
// Controls the convo-list (conversation list pane), allowing for display of the
// conversations and bulk/singular book-keeping operations upon conversations.
//
angular.module('wr.controllers')
.controller('convo', ['$scope', '$state', '$convoService', 'ModalService', function($scope, $state, $convoService, ModalService) {
    $scope.convo = {};
    $scope.response = {
        message : ""
    };

    $scope.modalOpen = false;

    ////////////////////////// LOADING A CONVERATION //////////////////////////

    // `loadConversation(pg)`
    // Load the conversation from the server using the conversation service.
    //
    // @pre     : the conversation service must be initialized
    // @post    : [success] the conversation will be loaded into the view
    // @post    : [error] if error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : id    : Number    : the id of the conversation to retrieve
    // @return  : null
    var loadConversation = function(id) {
        $convoService
            .loadConvo(id)
            .then(
                (conversation) => {
                    $scope.convo = conversation;
                    $scope.$apply();
                },
                (err) => {
                    console.error("[conversation]", err);
                    // FIXME: uncomment when notification service is implemented
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: `There was an error loading conversation ${id} from the server.`
                    // });
                });
    };

    ///////////////////////////////// REPLYING /////////////////////////////////

    // `replyDisabled(reply)`
    // Checks whether or not the reply button should be disabled. Currently, it
    // checks if the response box is an empty string. Returns true if so,
    // otherwise false.
    //
    // @post    : The reply button will be disabled according to this response.
    //
    // @param   : text  : String    : The reply string to test
    // @return  : Boolean   : Whether or not to disable the reply button
    $scope.replyDisabled = function(text) {
        return text.trim().length === 0;
    };

    // `doReply(reply)`
    // Sends the given reply string to the server to make a reply to the
    // conversation.
    //
    // @pre     : the conversation service must be initialized
    // @post    : [success] the response field will be cleared
    // @post    : [success] a message will be created and sent to the other
    // participant of the conversation
    // @post    : [success] a temporary message object will be inserted into the
    // DOM with the same information
    // @post    : [error] if error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : id        : Number    : the id of the conversation to retrieve
    // @param   : message   : String    : The message to reply with
    // @return  : null
    $scope.doReply = function(id, message) {
        $convoService
            .replyToConvo(id, message)
            .then(
                (createdMessage) => {
                    $scope.convo.messages.push(createdMessage);
                    $scope.response.message = "";
                    $scope.$apply();
                },
                (err) => {
                    console.error("[conversation]", err);
                    // FIXME: uncomment when notification service is implemented
                    // $notificationService.notify({
                    //     type: "error",
                    //     text: `There was an error loading conversation ${id} from the server.`
                    // });
                });
    };

    //////////////////////////////// FORWARDING ////////////////////////////////

    // `openForwardModal()`
    // Opens the modal for selecting the user to forward the conversation to.
    //
    // @pre     : the forwarding modal must be available
    // @pre     : the forwarding modal must not be open/visible on the page
    // @post    : the forwarding modal will be open and visible on the page
    //
    // @return  : null
    $scope.openForwardModal = function() {

        if ($scope.modalOpen === false) {
            $scope.modalOpen = true;
            ModalService.showModal({
                template: "<forward onclose='close' convo-id='id'/>",
                inputs: { id: $scope.convo.id },
                controller: function(close, id, $scope) {
                    $scope.close = close;
                    $scope.id = id;
                },
            }).then(function(modal) {
                // show modal

                // attach close handler
                modal.close.then($scope.closeForwardModal);
            });
        }
    };

    //  `closeForwardModal()`
    // Closes the modal for selecting the user to forward the conversation to.
    //
    // @pre     : the forwarding modal must be available
    // @pre     : the forwarding modal be open/visible on the page
    // @post    : the forwarding modal will be closed and invisible on the page
    //
    // @return  : null
    $scope.closeForwardModal = function(result) {
        $scope.modalOpen = false;
    };

    // Load conversation when initialized
    loadConversation($state.params.convoId);
}]);
}());
