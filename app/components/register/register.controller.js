// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `register`
// Controls the register card, allowing for user registration.
//
// @attr    : registerData                      : Object    : container for
// registration data
// @attr    : registerData.email                : String    : email of user
// attempting registration
// @attr    : registerData.password             : String    : pw of user
// attempting registration
// @attr    : registerData.confirmPassword      : String    : pw of user
// attempting registration
// @attr    : registerData.error                : Boolean   : whether an error
// has occurred
// @attr    : registerData.errorMsg             : String    : message stating
// what the error is, if any
//
// @method  : doRegister() : null  : Attempts to register user for web-response
// with the data submitted via $scope.registerData.
angular.module('wr.controllers')
.controller('register', ['$scope', '$state', '$authService', function($scope, $state, $authService) {

    $scope.registerData = {
        email: '',
        password: '',
        confirmPassword: '',
        error: true,
        errorMessage: ''
    };

    // `doRegister(ev)`
    // Attempts to log user into web-response with the data submitted via scope.
    //
    // @pre     : `$authService` must be initialized
    // @pre     : the user must submit confirm their intended password by
    // entering it twice
    // @post    : [success] the email and both password fields will be cleared
    // @post    : [success] the user will be redirected to the 'registerConfirm'
    // state
    // @post    : [error] a generic error message will be presented to the user
    //
    // @param   : ev    : Event : event object of button click
    // @return  : null
    $scope.doRegister = (ev) => {
        ev.preventDefault();

        // Check if registration
        $authService
            .register(
                $scope.registerData.email,
                $scope.registerData.password,
                $scope.registerData.confirmPassword
            )
            .then(
                (resp) => {
                    // Clear the fields
                    $scope.error = false;
                    $scope.registerData.email = "";
                    $scope.registerData.password = "";
                    $scope.registerData.confirmPassword = "";

                    // redirect to `/register-confirm`
                    $state.go('auth.register-confirm');
                },
                (err) => {
                    console.error("[login]", err);
                    // FIXME: Show register issue
                    $scope.error = false;
                    $scope.errorMsg = err.message;
            });
    };

}]);
}());
