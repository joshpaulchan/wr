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
            template: `<div class='modal-backdrop' ng-show='show' ng-class="{'modal-active': show}" ng-click='toHide()'>
                            <div class='modal' ng-include='templateUrl' ng-click='$event.stopPropagation();'></div>
                        </div>`,
            link: function($scope, elem, attrs) {}
        };
});
}());
