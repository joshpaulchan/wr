// Written by Joshua Paul A. Chan
describe("[controller] convoList", function() {

    // before each, load the modules
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('wr.services'));
    beforeEach(angular.mock.module('wr.controllers'));

    var $service;
    var deferred;
    var ctrlr;
    var scope;

    var convoList = [{
        id: 1,
        name: 'Jane',
        role: 'Designer',
        location: 'New York',
        twitter: 'gijane'
    }, {
        id: 2,
        name: 'Bob',
        role: 'Developer',
        location: 'New York',
        twitter: 'billybob'
    }, {
        id: 3,
        name: 'Jim',
        role: 'Developer',
        location: 'Chicago',
        twitter: 'jimbo'
    }, {
        id: 4,
        name: 'Bill',
        role: 'Designer',
        location: 'LA',
        twitter: 'dabill'
    }];

    // Inject the $controller service to create instances of the controller (UsersController) we want to test
    // Mock services and spy on methods
    beforeEach(inject(function($rootScope, $controller,  _$convoListService_) {
        scope = $rootScope.$new();
        spyOn(scope, '$emit');

        ctrlr = $controller('convoList', { $scope: scope });
        $service = _$convoListService_;

        // spyOn($convoListService, 'syncCall').and.callThrough();
        spyOn($service, 'loadConvos').and.callFake(function() {
            return convoList;
        });
        spyOn($service, 'search').and.callFake(function() {
            return convoList;
        });
        spyOn($service, 'updateConvos').and.callFake(function() {
            return convoList;
        });
        spyOn($service, 'loadNext').and.callFake(function() {
            return convoList;
        });

    }));

    // Verify our controller exists
    it('should be defined', function() {
        expect(ctrlr).toBeDefined();
    });

    // Test all attributes exist and match expected default values
    describe('.query', function() {
        it('should be defined', function() {
            expect(scope.query).toBeDefined();
        });

        it('should be a string', function() {
            expect(angular.isString(scope.query)).toBe(true);
        });

        it('should be "" by default', function() {
            expect(scope.query).toBe("");
        });
    });

    describe('.isSearch', function() {
        it('should be defined', function() {
            expect(scope.isSearch).toBeDefined();
        });

        it('should be a boolean', function() {
            expect(scope.isSearch === true || scope.isSearch === false).toBe(true);
        });

        it('should be false by default', function() {
            expect(scope.isSearch).toBe(false);
        });
    });

    describe('.curFilter', function() {
        it('should be defined', function() {
            expect(scope.curFilter).toBeDefined();
        });

        it('should be a string', function() {
            expect(angular.isString(scope.curFilter)).toBe(true);
        });

        // FIXME: default value for curFilter
        it('should be "all" by default', function() {
            expect(scope.curFilter.indexOf('ALL')).not.toBe(-1);
        });
    });

    describe('.curPage', function() {
        it('should be defined', function() {
            expect(scope.curPage).toBeDefined();
        });

        it('should be a number', function() {
            expect(angular.isNumber(scope.curPage)).toBe(true);
        });

        it('should be 0 by default', function() {
            expect(scope.curPage).toBe(0);
        });
    });

    describe('.numItemsPerPage', function() {
        it('should be defined', function() {
            expect(scope.numItemsPerPage).toBeDefined();
        });

        it('should be a number', function() {
            expect(angular.isNumber(scope.numItemsPerPage)).toBe(true);
        });

        it('should be 25 by default', function() {
            expect(scope.numItemsPerPage).toBe(25);
        });
    });

    describe('.convos', function() {
        it('should be defined', function() {
            expect(scope.convos).toBeDefined();
        });

        it('should be an array', function() {
            expect(angular.isArray(scope.convos)).toBe(true);
        });

        it('should be [] by default', function() {
            expect(scope.convos).toEqual([]);
        });
    });

    describe('.selectedConvos', function() {
        it('should be defined', function() {
            expect(scope.selectedConvos).toBeDefined();
        });

        it('should be a Set', function() {
            expect(scope.selectedConvos instanceof Set).toBe(true);
        });

        it('should be empty by default', function() {
            expect(scope.selectedConvos.size).toBe(0);
        });
    });

    // TODO: Test all methods exist and return expected outputs

    describe('on load', function() {
        // TODO: Test expected intial behavior of loading conversations and inserting into dom
        // 1. must make GET req
        // 2. upon insertion, number of items must match numItemsPerPage

        it('should load the conversations on initial load', function() {
            expect($service.loadConvos).toHaveBeenCalled();
        });
    });

    describe('searching', function() {
        // TODO: Test searches can be perfomed
        // 1. text must be able to be typed and tracked
        // 2. upon successful submission, input must not clear
        // 3. upon successful submission, listed convos should change (probably)
        // 4. upon error, notification must be logged
    });


    describe('conversations', function() {
        // TODO: Items can be viewed
        // 1. An item can only be viewed by clicking on the body of the list item
        // 2. upon selection, the state will be changed
        // 3. upon error, log will be sent

        // TODO: Items can be selected
        // 1. An item can be selected by pressing the check button or clicking on it
        // 2. An item can be deselected after selecting via the same manner
        // 3. Multiple items can be selected at once

        // TODO: List buttons are only available when a conversation is open or convos are selected
        // 1. only when 1 or or more items are selected/viewed do the buttons become enabled

        // TODO: items can be moved to different folders
        // gen basic convo object
        // 1. should generate a PUT req to move move item to different folder
        // 2. should work with multiple items, but 1 PUT req

        // TODO: items can be marked with different statuses
        // gen a basic convo object
        // 1. should generate a put req with the selected convos
        // 1. should generate 1 PUT req even with multiple items
    });
});
