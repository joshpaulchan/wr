// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `convoList` COMPONENT
//
angular.module('wr.components')
.component('convoList', {
    templateUrl: __env.clientUrl + '/app/components/convoList/convoList.view.html',
    controller: 'convoList'
});
}());
