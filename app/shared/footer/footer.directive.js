(function() {
"use strict";

angular.module('wr')
.directive('footer', ['__env', function(__env) {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: __env.clientUrl + "/app/shared/footer/footer.view.html"
    };
}]);

})();
