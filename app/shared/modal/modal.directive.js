(function() {
"use strict";

angular.module('wr.directives')
    .directive('modal', function() {
        return {
            restrict: "E",
            scope: {
                "templateUrl": "@",
                "show": "=",
                "toHide": "="
            },
            templateUrl: "client/app/shared/modal/modal.view.html"
        };
});
}());
