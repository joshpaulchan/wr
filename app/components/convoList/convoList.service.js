// Written by Joshua Paul A. Chan
(function() {
"use strict";

// TODO: build summary of the convoList service
// `$convoListService` SERVICE
// Serves the convoList by perfoming bulk operations on conversations.
//
// @pre     : networking libs must be initialized
//
// @attr    : apiUrl        : String    : base API url of the resource
// @attr    : query         : String    :
//
// @method  : loadConvos    : Promise   :
// @method  : search        : Promise   :
// @method  : loadNext      : Promise
// @method  : updateConvos  : Promise   :
//
angular.module('wr.services')
.service('$convoListService', function($http) {
    var service = this;
    service.apiURL = "";

    // defaults
    service.query = "";
    service.isSearch = false;
    service.curPage = 0;
    service.curSearchPage = 0;
    service.numItemsPerPage = 25;

    // TODO: `loadConvos(pg, numItemsPerPage)`
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
            // CODE IN HERE
            resolve([]);
        });
    };

    // TODO: `search(query, numItemsPerPage)`
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
            // CODE IN HERE
            resolve([]);
        });
    };

    // TODO: `loadNext()`
    // Either 1) retrieves the next page following a .loadConversations(..), or
    // 2) retrieves the next page of serach results following a .search(..).
    //
    // @pre     : `numItemsPerPage` must be a positive number or null, if null
    // will default to 25
    // @pre     : if `isSearch` is truthy, will load next page of search results
    // @pre     : if `isSearch` is falsey, will load next page of conversations
    // @post    : [success] increments the current page
    // @post    : [success] returned promise will resolve to conversations[]
    // @post    : [error] returned promise will reject to an error message
    //
    // @return  : Promise   : resolves to conversation[] or error message str
    service.loadNext = function() {
        // CODE IN HERE
        if (isSearch === true) {
            // load next page of search results
        } else {
            // load next page of conversations
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

    return service;
});
}());
