(function() {
"use strict";

angular.module('wr.directives')
    .directive('card', function() {
        return {
            restrict: "E",
            scope: {
                "templateUrl": "@",
                "show": "=",
                "toHide": "="
            },
            replace: true,
            transclude: true,
            templateUrl: "client/app/shared/card/card.view.html"
        };
});
}());
