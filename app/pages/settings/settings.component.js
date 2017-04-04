// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `settings` PAGE
//
angular.module('wr.pages')
.component('settings', {
    templateUrl: __env.clientUrl + '/app/pages/settings/settings.view.html',
    controller: 'settings'
});
}());
