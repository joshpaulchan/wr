// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `$authService` SERVICE
// Defines methods for authenticating users by logging them in, de-authing by
// logging them out, and submitting registration applications.
//
// @pre     : networking libs must be initialized
// @pre     : sessionStorage must be available
//
// @attr    : apiUrl : String    : base API url of the resource
//
// @method  : login     : null      : Attempts to authenticate the user to the
// server.
// @method  : logout    : Promise   : Attempts to log user out from the server.
// @method  : register  : Promise   : Submits a user registration application to
// the server.
// @method  : loggedIn  : Promise   : Checks whether the user is logged in or
// not.
angular.module('wr.services')
.service('$authService', ['$http', '__env', function($http, __env) {
    var service = this;
    service.apiURL = __env.apiUrl + '/auth';

    // `login(email, pw)`
    // Attempts to authenticate the user to the server.
    //
    // @pre     : `email` must be a valid email of a user previously registered
    // with the server
    // @pre     : `pw` must be the valid password corresponding to the email
    //
    // @post    : [success] the user session object will be returned
    // @post    : [success] the user session object will be saved to
    // sessionStorage
    // @post    : [error] an error message will be returned
    //
    // @param   : email : String    : email of the user intending to log in
    // @param   : pw    : String    : password of the user intending to log in
    // @return  : Promise   : resolves to user object or rejects to error
    // message
    service.login = (email, pw) => {
        return new Promise(function(resolve, reject) {
            $http
                .get(`${service.apiURL}/login`, {

                })
                .then((resp) => {
                    // save user session in sessionStorage
                    sessionStorage.setItem('wr-user', resp.data);
                    resolve(resp.data);
                })
                .catch(reject);
        });
    };

    // `logout()`
    // Attempts to log user out from the server.
    //
    // @pre     : user must be already logged-in
    //
    // @post    : the user session object will be deleted from sessionStorage
    //
    // @return  : Promise   : resolves to null
    service.logout = () => {
        return new Promise(function(resolve, reject) {
            // remove user from sessionStorage
            sessionStorage.removeItem('wr-user');

            // resolve no matter what
            $http
                .get(`${service.apiURL}/logout`)
                .then(resolve)
                .catch(resolve);

        });
    };

    // `register(email, pw, confirmPw)`
    // Submits a user registration application to the server.
    //
    // @pre     : `email` must be a valid unique email
    // @pre     : `pw` must be the intended password
    // @pre     : `pw` must be a copy of the intended password
    //
    // @post    : [success] the `null` value will be returned
    // @post    : [error] an error message will be returned
    //
    // @param   : email     : String    : email of the user intending to
    // register
    // @param   : pw        : String    : password of the user intending to
    // register
    // @param   : confirmPw : String    : repeated password
    // @return  : Promise   : resolves to null or rejects to error message
    service.register = (email, pw, confirmPw) => {
        return new Promise(function(resolve, reject) {
            // check that pw === confirmPw
            if (pw !== confirmPw) {
                return reject({
                    message: "Passwords do not match."
                });
            }

            $http
                .post(`${service.apiURL}/register`, {
                    email : email,
                    password : password,
                })
                .then(resolve)
                .catch(reject);
        });
    };

    // `isLoggedIn()`
    // Checks whether the user is logged in or not.
    //
    // @return  : Promise   : resolves to true if user is logged in, false
    // otherwise    
    service.isLoggedIn = () => {
        return new Promise(function(resolve, reject) {
            resolve(!!sessionStorage.getItem('wr-user'));
        });
    };

    return service;
}]);
}());
