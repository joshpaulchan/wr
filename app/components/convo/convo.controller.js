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

    // Load conversation when initialized
    loadConversation($state.params.convoId);
});
}());
