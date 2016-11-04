/* global angular, document, window, console, Promise */
'use strict';

var webresponseDirectives = angular.module('webresponseDirectives', []);

webresponseDirectives.directive('contenteditable', function() {
    return {
        restrict: "A",
        require: "?ngModel",
        link: function(scope, elem, attrs, ngModel) {
            if (!ngModel) return;

            var updateView = function() {
                ngModel.$setViewValue(elem.html());
            };

            ngModel.$render = function() {
                elem.html(ngModel.$viewValue || "");
            };

            elem.on("blur keyup change", function() {
                scope.$apply(updateView);
            });

            scope.$on('destroy', function() {
                elem.off('blur keyup change', updateView);
            });
        }
    };
});

webresponseDirectives.directive('modal', function() {
    return {
        restrict: "E",
        scope: {
            "templateUrl": "@",
            "show": "=",
            "toHide": "="
        },
        template: "<div class='modal-backdrop' ng-show='show' ng-class=\"{'modal-active': show}\" ng-click='toHide()'>\
                        <div class='modal' ng-include='templateUrl' ng-click='$event.stopPropagation();' ></div>\
                    </div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('convoCard', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card convo-card card-shadow' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardHeader', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-header' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardHeaderInput', function() {
    return {
        restrict: 'E',
        scope: {
            'label': '@',
            'ngModel': '=',
            'ngChange': '='
        },
        template: "<div class='card-header card-header-input'><label>{{label}}</label><div contenteditable ng-model='ngModel' ng-change='ngChange'></div></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardBody', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-body' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardBodyInput', function() {
    return {
        restrict: 'E',
        scope: {
            'vResizeable': '=',
            'ngModel': '=',
            'ngChange': '='
        },
        template: "<div class='card-body card-body-input' ng-class=\"{'vertical-resizeable' : vResizeable}\" contenteditable ng-model='ngModel' ngChange='ngChange'></div>",
        link: function($scope, elem, attrs) {}
    };
});

webresponseDirectives.directive('cardFooter', function() {
    return {
        restrict: 'E',
        transclude: true,
        template: "<div class='card-footer' ng-transclude></div>",
        link: function($scope, elem, attrs) {}
    };
});
