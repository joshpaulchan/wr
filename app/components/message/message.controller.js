// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoItem`
//
angular.module('wr.controllers')
.controller('message', function($sce) {
    var $ctrl = this;

    $ctrl.safe_body = $sce.trustAsHtml($ctrl.body);
});
}());
