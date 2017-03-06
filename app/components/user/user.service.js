// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `$userService` SERVICE
// Middleware for querying the users API.
//
// @pre     : networking libs must be initialized
// @pre     : app must be configured with an `__env`
//
// @attr    : apiUrl            : String    : base API url of the resource
// @attr    : curApprovedPage   : Number    : current page of approved users
// @attr    : curUnapprovedPage : Number    : current page of unapproved users
// @attr    : nextApprovedUrl   : String    : url of the next page of approved users
// @attr    : numItemsPerPage   : Number    : number of items to load per page for a search/load
//
// @method  : loadUsers    : Promise   : Retrieves a page of the most recent users from the server.
// @method  : loadNext      : Promise   : Either 1) retrieves the next page following a .loadConversations(..), or 2) retrieves the next page of serach results following a .search(..).
//
angular.module('wr.services')
.service('$userService', function($http, __env) {
    var service = this;
    service.apiURL = __env.apiUrl + '/users';

    // defaults
    service.curApprovedPage = 0;
    service.curUnapprovedPage = 0;
    service.nextApprovedUrl = null;
    service.nextUnapprovedUrl = null;
    service.numItemsPerPage = 25;

    // `loadApprovedUsers(pg, numItemsPerPage)`
    // Retrieves a page of approved users from the server.
    //
    // @pre     : `pg` must be a non-negative Number or null, if null will
    // default to 0
    // @pre     : `numItemsPerPage` must be a positive Number or null, if null
    // will default to 25
    // @post    : if given, `pg` will set `curPage` so `loadNext` can be used
    // @post    : if given, `numItemsPerPage` will set `numItemsPerPage` so
    // `loadNext` can be used
    // @post    : [success] resets curApprovedPage to given pg
    // @post    : [success] returned promise will resolve to users[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : pg                : Number    : the page number to load
    // (assuming numItemsPerPage is the number of items in a page) [ default=0 ]
    // @param   : numItemsPerPage   : Number    : the number of items per page [
    // default=25 ]
    // @return  : Promise   : resolves to users[] or error message str
    service.loadApprovedUsers = function(pg, numItemsPerPage) {
        return new Promise(function(resolve, reject) {
            $http
                .get(service.apiURL, {
                    params: {
                        page : pg,
                        n : numItemsPerPage,
                        approval : true
                    }
                })
                .then((resp) => {
                    service.curApprovedPage = pg;
                    service.nextApprovedUrl = resp.data.next_page_url;
                    service.numItemsPerPage = numItemsPerPage;
                    resolve(resp.data.data);
                })
                .catch(reject);
        });
    };

    // `loadUnapprovedUsers(pg, numItemsPerPage)`
    // Retrieves a page of unapproved users from the server.
    //
    // @pre     : `pg` must be a non-negative Number or null, if null will
    // default to 0
    // @pre     : `numItemsPerPage` must be a positive Number or null, if null
    // will default to 25
    // @post    : if given, `pg` will set `curPage` so `loadNext` can be used
    // @post    : if given, `numItemsPerPage` will set `numItemsPerPage` so
    // `loadNext` can be used
    // @post    : [success] resets curApprovedPage to given pg
    // @post    : [success] returned promise will resolve to users[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : pg                : Number    : the page number to load
    // (assuming numItemsPerPage is the number of items in a page) [ default=0 ]
    // @param   : numItemsPerPage   : Number    : the number of items per page [
    // default=25 ]
    // @return  : Promise   : resolves to users[] or error message str
    service.loadUnapprovedUsers = function(pg, numItemsPerPage) {
        return new Promise(function(resolve, reject) {
            $http
                .get(service.apiURL, {
                    params: {
                        page : pg,
                        n : numItemsPerPage
                    }
                })
                .then((resp) => {
                    service.curUnapprovedPage = pg;
                    service.nextUnapprovedUrl = resp.data.next_page_url;
                    service.numItemsPerPage = numItemsPerPage;
                    resolve(resp.data.data);
                })
                .catch(reject);
        });
    };

    // `loadNext()`
    // Either 1) retrieves the next page following a .loadConversations(..), or
    // 2) retrieves the next page of serach results following a .search(..).
    //
    // @pre     : `numItemsPerPage` must be a positive number or null, if null
    // will default to 25
    // @pre     : `service.nextUrl` must be a valid url and not null
    // @pre     : if `isSearch` is truthy, will load next page of search results
    // @pre     : if `isSearch` is falsey, will load next page of users
    // @post    : [success] increments the current page
    // @post    : [success] returned promise will resolve to users[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @return  : Promise   : resolves to conversation[] or error message str
    service.loadNext = function() {
        if (service.nextUrl) {
            return new Promise(function(resolve, reject) {
                $http.get(service.nextUrl)
                    .then((resp) => {
                        if (service.isSearch) { service.curSearchPage += 1; }
                        else { service.curPage += 1; }
                        service.nextUrl = resp.data.next_page_url;
                        resolve(resp.data.data);
                    })
                    .catch(reject);
            });
        }
    };

    // `loadUser(id)`
    // Retrieves a specific user from the server.
    //
    // @pre     : `id` must be a non-negative Number corresponding to the id of
    // a valid user record
    // @post    : [success] returned promise will resolve to user
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : id                : Number    : the user to load
    // @return  : Promise   : resolves to user object or error message str
    service.loadUser = function(id) {
        return new Promise(function(resolve, reject) {
            $http
                .get(`${service.apiURL}/${id}`)
                .then((resp) => {
                    resolve(resp.data.data);
                })
                .catch(reject);
        });
    };

    return service;
});
}());
