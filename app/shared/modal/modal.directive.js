(function() {
"use strict";

angular.module('wr.directives')
    .directive('modal', ['__env', function(__env) {
        return {
            restrict: "E",
            scope: {
                "templateUrl": "@",
                "show": "=",
                "toHide": "="
            },
            templateUrl: __env.clientUrl + "/app/shared/modal/modal.view.html"
        };
}]);
}());
