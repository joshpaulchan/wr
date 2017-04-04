(function() {
"use strict";

angular.module('wr.directives')
    .directive('card', ['__env', function(__env) {
        return {
            restrict: "E",
            scope: {
                "templateUrl": "@",
                "show": "=",
                "toHide": "="
            },
            replace: true,
            transclude: true,
            templateUrl: __env.clientUrl + "/app/shared/card/card.view.html"
        };
}]);
}());
