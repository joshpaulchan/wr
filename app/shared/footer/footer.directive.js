(function() {
"use strict";

angular.module('wr')
.directive('footer', function() {
    return {
        replace: true,
        restrict: 'E',
        templateUrl: "client/app/shared/footer/footer.view.html"
    };
});

})();
