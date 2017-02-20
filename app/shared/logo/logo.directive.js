(function() {
"use strict";

angular.module('wr')
.directive('logo', function() {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: "client/app/shared/logo/logo.view.html"
    };
});

})();
