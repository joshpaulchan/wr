// Written by Joshua Paul A. Chan
(function() {
"use strict";

// // object.watch
// if (!Object.prototype.watch) {
// 	Object.defineProperty(Object.prototype, "watch", {
// 		  enumerable: false
// 		, configurable: true
// 		, writable: false
// 		, value: function (prop, handler) {
// 			var
// 			  oldval = this[prop]
// 			, newval = oldval
// 			, getter = function () {
// 				return newval;
// 			}
// 			, setter = function (val) {
// 				oldval = newval;
// 				return newval = handler.call(this, prop, oldval, val);
// 			}
// 			;
//
// 			if (delete this[prop]) { // can't watch constants
// 				Object.defineProperty(this, prop, {
// 					  get: getter
// 					, set: setter
// 					, enumerable: true
// 					, configurable: true
// 				});
// 			}
// 		}
// 	});
// }
//
// // object.unwatch
// if (!Object.prototype.unwatch) {
// 	Object.defineProperty(Object.prototype, "unwatch", {
// 		  enumerable: false
// 		, configurable: true
// 		, writable: false
// 		, value: function (prop) {
// 			var val = this[prop];
// 			delete this[prop]; // remove accessors
// 			this[prop] = val;
// 		}
// 	});
// }

// `forward`
// Controls the conversation forwarding modal
//
// @attr    : loginData             : Object    : container for login data
// @attr    : loginData.to          : String    : recipient of
// @attr    : loginData.message     : String    : pw of user attempting login
// @attr    : loginData.error       : Boolean   : whether an error has occurred
// @attr    : loginData.errorMsg    : String    : message stating what the error
// is, if any
//
// @method  : doLogin() : null  : Attempts to log user into web-response with
// the data submitted via scope.
angular.module('wr.controllers')
.controller('forward', ['$scope', '$convoService', function($scope, $convoService) {
    var $ctrl = this;

    $scope.forwardData = {
        email: '',
        message: '',
        error: false,
        errorMsg: ''
    };

    // TODO: figure out why data.email is not playing nicely with ng-model
    // debugger;
    // data.watch('email',  function() {debugger;});

    // `doForward(ev)`
    // Forwards the given conversation to the given email.
    //
    // @pre     : the conversation service must be initialized
    // @post    : [success] the conversation, in its entirety, will be emailed
    // to the other user
    // @post    : [success] a notification will pop up confirming the success of
    // the action
    // @post    : [error] if error, error will be sent to error service to
    // display on page and log for analytics
    //
    // @param   : id        : Number    : the id of the conversation to retrieve
    // @param   : email     : String    : the email of the person to forward the
    // conversation to
    // @param   : message   : String    : The message to forward with
    // @return  : null
    $ctrl.doForward = (ev) => {
        ev.preventDefault();

        console.log($scope.forwardData);

		if (!$scope.forwardData.email) {
			$scope.forwardData.error = true;
			$scope.forwardData.errorMsg = "Please enter a valid email.";
			return;
		}

        $convoService
            .forwardToEmail($ctrl.convoId, $scope.forwardData.email, $scope.forwardData.message)
            .then(
                (resp) => {
                    // Clear the fields
                    $scope.forwardData.error = false;
                    $scope.forwardData.email = "";
                    $scope.forwardData.message = "";

                    // return
                    $ctrl.closeModal(resp);
                },
                (err) => {
                    console.error("[forward]", err);
                    $scope.forwardData.error = true;
                    $scope.forwardData.errorMsg = err.data.message || "Error forwarding conversation.";
                    $scope.$apply();
            });
    };

    $ctrl.closeModal = function(res) { $ctrl.onclose(res, 250); };

}]);
}());
