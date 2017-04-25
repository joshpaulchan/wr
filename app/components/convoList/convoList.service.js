// Written by Joshua Paul A. Chan
(function() {
"use strict";

// `$convoListService` SERVICE
// Serves the convoList by perfoming bulk operations on conversations.
//
// @pre     : networking libs must be initialized
// @pre     : app must be configured with an `__env`
//
// @attr    : apiUrl            : String    : base API url of the resource
// @attr    : query             : String    : current query string
// @attr    : isSearch          : Boolean   : whether a search was the last load performed or not
// @attr    : curPage           : Number    : current page of conversations
// @attr    : curSearchPage     : Number    : current page of search results
// @attr    : nextUrl           : String    : url of the next page of conversations/search results to load
// @attr    : numItemsPerPage   : Number    : number of items to load per page for a search/load
//
// @method  : loadConvos    : Promise   : Retrieves a page of the most recent conversations from the server.
// @method  : search        : Promise   : Retrieves a page of conversations related to the given query.
// @method  : loadNext      : Promise   : Either 1) retrieves the next page following a .loadConversations(..), or 2) retrieves the next page of serach results following a .search(..).
// @method  : updateConvos  : Promise   : Updates the given conversations with the given options on the server.
//
angular.module('wr.services')
.service('$convoListService', function($http, __env) {
    var service = this;
    service.apiURL = __env.apiUrl + '/conversations';

    // defaults
    service.query = "";
    service.isSearch = false;
    service.curPage = 0;
    service.curSearchPage = 0;
    service.nextUrl = null;
    service.numItemsPerPage = 25;

    // `loadConvos(pg, numItemsPerPage)`
    // Retrieves a page of the most recent conversations from the server.
    //
    // @pre     : `pg` must be a non-negative Number or null, if null will
    // default to 0
    // @pre     : `numItemsPerPage` must be a positive Number or null, if null
    // will default to 25
    // @post    : if given, `pg` will set `curPage` so `loadNext` can be used
    // @post    : if given, `numItemsPerPage` will set `numItemsPerPage` so
    // `loadNext` can be used
    // @post    : [success] resets curPage to given pg
    // @post    : [success] returned promise will resolve to conversations[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : pg                : Number    : the page number to load
    // (assuming numItemsPerPage is the number of items in a page) [ default=0 ]
    // @param   : numItemsPerPage   : Number    : the number of items per page [
    // default=25 ]
    // @return  : Promise   : resolves to conversations[] or error message str
    service.loadConvos = function(pg, numItemsPerPage) {
        return new Promise(function(resolve, reject) {
            $http
                .get(service.apiURL, {
                    params: {
                        page : pg,
                        n : numItemsPerPage
                    }
                })
                .then((resp) => {
                    service.curPage = pg;
                    service.numItemsPerPage = numItemsPerPage;
                    service.isSearch = false;
                    service.nextUrl = resp.data.next_page_url;
                    resolve(resp.data.data.map(formatConvo));
                })
                .catch(reject);
        });
    };

    // `search(query, numItemsPerPage)`
    // Retrieves a page of conversations related to the given query.
    //
    // @pre     : `query` must be a non-empty String

    // @pre     : `numItemsPerPage` must be a positive number or null, if null
    // will default to 25
    // @post    : if given, `numItemsPerPage` will set `numItemsPerPage` so
    // `loadNext` can be used
    // @post    : [success] resets `curSearchPage` to 0
    // @post    : [success] returned promise will resolve to conversations[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : query             : String    : search query
    // @param   : numItemsPerPage   : Number    : the number of items per page [
    // default=25 ]
    // @return  : Promise   : resolves to conversation[] or error message str
    service.search = function(query, numItemsPerPage) {
        return new Promise(function(resolve, reject) {
            $http
                .get(service.apiURL, {
                    params: {
                        q : query,
                        n : numItemsPerPage
                    }
                })
                .then((resp) => {
                    service.curSearchPage = 1;
                    service.numItemsPerPage = numItemsPerPage;
                    service.isSearch = true;
                    service.nextUrl = resp.data.next_page_url;
                    resolve(resp.data.data.map(formatConvo));
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
    // @pre     : if `isSearch` is falsey, will load next page of conversations
    // @post    : [success] increments the current page
    // @post    : [success] returned promise will resolve to conversations[]
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

    // TODO: `updateConvos(convoIds, opts)`
    // Updates the given conversations with the given options on the server.
    //
    // @pre     : `convoIds` must be a non-empty array of valid conversation ids
    // @pre     : `opts` must be an Object with keys corresponding to valid
    // Conversation attributes and values corresponding to valid values for
    // those keys
    // @post    : [success] returned promise will resolve to conversations[]
    // with the updated information
    // @post    : [error] returned promise will reject to an error message
    //
    // @return  : Promise   : resolves to conversation[] or error message str
    service.updateConvos = function(convoIds, opts) {
        return new Promise(function(resolve, reject) {
            resolve([]);
        });
    };

    // `formatConvo(c)`
    // Formats the given conversation object for JS datatypes.
    //
    // @pre     : `c` must be an object
    // @post    : `c` will be un=modified
    // @post    : a transformed copy of `c` will be returned
    //
    // @param   : Object    : c : conversation object to format
    // @return  : Object    : formatted conversatio object
    var formatConvo = (c) => {
        return Object.assign({}, c, {
            createdAt : new Date(c.createdAt)
        });
    };

    return service;
});
}());
