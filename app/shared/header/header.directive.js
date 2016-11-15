(function() {
"use strict";

angular.module('wr')
.directive('header', function() {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: "client/app/shared/header/header.view.html"
    };
});

})();
