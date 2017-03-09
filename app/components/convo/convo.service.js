// Written by Joshua Paul A. Chan
(function() {
"use strict";

// TODO: build summary of the $convoService
// `$convoService` SERVICE
// Serves the convo view by loading and manipulating specific conversations
//
// @pre     : networking libs must be initialized
//
// @attr    : apiUrl        : String    : base API url of the resource
//
// @method  : loadConvo         : Promise   :
// @method  : updateConvo       : Promise   :
// @method  : replyToConvo      : Promise   :
// @method  : forwardToEmail    : Promise   :
//
angular.module('wr.services')
.service('$convoService', function($http, __env) {
    var service = this;
    service.apiURL = __env.apiUrl + '/conversation';

    // `loadConvo(id)`
    // Retrieves a conversation from the server.
    //
    // @pre     : `id` must be  a valid Conversation id
    // @post    : [success] resets curPage to given pg
    // @post    : [success] returned promise will resolve to conversation
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : id    : Number    : the id of the conversation to retrieve
    // @return  : Promise   : resolves to conversation or error message str
    service.loadConvo = function(id) {
        return new Promise(function(resolve, reject) {
            $http
                .get(`${service.apiURL}/${id}`)
                .then((resp) => {
                    resolve(formatConvo(resp.data));
                })
                .catch(reject);
        });
    };

    // TODO: `updateConvo(convoIds, opts)`
    // Updates the given conversation with the given options.
    //
    // @pre     : `id` must be  a valid Conversation id
    // @pre     : `opts` must be an Object with keys corresponding to valid
    // Conversation attributes and values corresponding to valid values for
    // those keys
    // @post    : [success] returned promise will resolve to conversations[]
    // with the updated information
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : id    : Number    : the id of the conversation to update
    // @return  : Promise   : resolves to conversation or error message str
    service.updateConvo = function(id, opts) {
        return new Promise(function(resolve, reject) {
            resolve([]);
        });
    };

    // TODO: `replyToConvo(id, message)`
    // Replies to the given conversation with a new message, creates it and
    // emails it to the other participant in the conversation.
    //
    // @pre     : `id` must be  a valid Conversation id
    // @pre     : `message` must be an unsanitized/ String
    // @post    : [success] a new message will be created
    // @post    : [success] returned promise will resolve to the newly-created
    // Message
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : id        : Number    : the id of the conversation to respond
    // to
    // @param   : message   : String    : the message to respond with
    // @return  : Promise   : resolves to Message or error message str
    service.replyToConvo = function(id, message) {
        return new Promise(function(resolve, reject) {
            $http
                .post(`${service.apiURL}/${id}`, {
                    message : message
                })
                .then((resp) => {
                    resolve(resp.data);
                })
                .catch(reject);
        });
    };

    // TODO: `forwardToEmail(email)`
    // Forwards the given conversation to a given email with a forwarding
    // message.
    //
    // @pre     : `id` must be  a valid Conversation id
    // @pre     : `email` must be a valid email
    // @post    : [success] the conversation in its entirety will be forwarded
    // to the person with the given email, with the given message as the body of
    // the email
    // @post    : [success] returned promise will resolve to { success : true }
    // @post    : [error] returned promise will reject to an error message
    //
    // @param   : id        : Number    : the id of the conversation to forward
    // @param   : email     : String    : the email to forward to
    // @param   : message   : String    : the message to forward with
    // @return  : Promise   : resolve to success Object or error message str
    service.forwardToEmail = function(id, email, message) {
        return new Promise(function(resolve, reject) {
            resolve({});
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
