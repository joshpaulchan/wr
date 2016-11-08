(function() {
"use strict";

angular.module('wr.directives')
.directive('contenteditable', function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, elem, attrs, ngModel) {
            if (!ngModel) return;

            var updateView = () => { ngModel.$setViewValue(elem.html()); };

            ngModel.$render = () => { elem.html(ngModel.$viewValue || ""); };

            elem.on("blur keyup change", () => { scope.$apply(updateView); });

            scope.$on('destroy', () => { elem.off('blur keyup change', updateView); });
        }
    };
});
}());
