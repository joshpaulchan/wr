// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convo`
// Controls the convo-list (conversation list pane), allowing for display of the
// conversations and bulk/singular book-keeping operations upon conversations.
//
angular.module('wr.controllers')
.controller('convo', function($scope, $state, $convoService) {
    var $ctrl = this;

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
                    $ctrl.convo = conversation;
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

    //
    $scope.replyDisabled = function() {

    };

    $scope.reply = function() {

    };

    // Load conversation when initialized
    loadConversation($state.params.convoId);
});
}());
