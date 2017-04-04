(function() {
"use strict";

angular.module('wr')
.directive('logo', ['__env', function(__env) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: __env.clientUrl + "/app/shared/logo/logo.view.html"
    };
}]);

})();
