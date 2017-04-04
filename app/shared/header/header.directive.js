(function() {
"use strict";

angular.module('wr')
.directive('header', ['__env', function() {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: __env.clientUrl + "/app/shared/header/header.view.html"
    };
}]);

})();
