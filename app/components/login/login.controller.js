// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `login`
// Controls the login card (conversation list pane), allowing for logging in and
// logging out.
//
//
// @attr    : loginData             : Object    : container for login data
// @attr    : loginData.email       : String    : email of user attempting login
// @attr    : loginData.password    : String    : pw of user attempting login
// @attr    : loginData.error       : Boolean   : whether an error has occurred
// @attr    : loginData.errorMsg    : String    : message stating what the error
// is, if any
//
// @method  : doLogin() : null  : Attempts to log user into web-response with
// the data submitted via scope.
angular.module('wr.controllers')
.controller('login', ['$scope', '$state', '$authService', function($scope, $state, $authService) {

    $scope.loginData = {
        email: '',
        password: '',
        error: false,
        errorMsg: ''
    };

    // `doLogin(ev)`
    // Attempts to log user into web-response with the data submitted via scope.
    //
    // @pre     : `$authService` must be initialized
    // @pre     : the user must submit
    // @post    : [success] the email and password fields will be cleared
    // @post    : [success] the user will be redirected to the 'conversations'
    // state
    // @post    : [error] a generic error message will be presented to the user
    //
    // @param   : ev    : Event : event object of button click
    // @return  : null
    $scope.doLogin = (ev) => {
        ev.preventDefault();

        $authService
            .login($scope.loginData.email, $scope.loginData.password)
            .then(
                (resp) => {
                    // Clear the fields
                    $scope.error = false;
                    $scope.loginData.email = "";
                    $scope.loginData.password = "";

                    // redirect to /conversations
                    $state.go('convos');
                },
                (err) => {
                    console.error("[login]", err);
                    $scope.loginData.error = true;
                    $scope.loginData.errorMsg = err.data.message || "Error logging in.";
                    $scope.$apply();
            });
    };

}]);
}());
