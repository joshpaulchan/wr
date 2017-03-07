// Written by Joshua Paul A. Chan
(function() {
"use strict";

angular.module('wr.controllers')
.controller('messageBox', function($scope, textAngularManager) {
    var $ctrl = this;

    //////////////////////////////// TEMPLATES ////////////////////////////////

    $ctrl.openTemplateModal = function() {
        // CODE HERE
        console.log("opening template modal...");
    };

    $scope.closeTemplateModal = function() {
        // CODE HERE
        console.log("opening template modal...");
    };

    /////////////////////////////// textAngular ///////////////////////////////

    // FIXME: there has to be a better way to add a tool to the tool bars (uniquely).
    // \ not this though, the templating functions won't be available until this controller.
    // $provide.decorator('taOptions', function(taRegisterTool, taOptions) {
    //     // $delegate is the taOptions we are decorating
    //     // register the tool with textAngular
    //     taRegisterTool('colourRed', {
    //         action: function(){
    //             this.$editor().wrapSelection('forecolor', 'red');
    //         }
    //     });
    //     // add the button to the default toolbar definition
    //     taOptions.toolbar[1].push('colourRed');
    //     return taOptions;
    // });
    try {
        textAngularManager.addTool('insertTemplate', {
            display: "<button><i class='ion-document-text icon--sm'></i> Template</button>",
            action: $ctrl.openTemplateModal
        });
    } catch (e) { }

    $ctrl.toolbars = [
        ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'pre'],
        ['bold', 'italics', 'underline', 'strikeThrough'],
        ['ul', 'ol', 'indent', 'outdent'],
        ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
        ['insertTemplate']
    ];
});
}());
