"use strict";

define([
    "angular",
    "js/controllers/<%= cameledName %>/<%= cameledName %>",
    "mock"
], function (angular, <%= cameledName %>, mock){

    describe("Controller: <%= classedName %>Ctrl", function () {

        // load the controller"s module
        var <%= classedName %>Ctrl,
        scope;

        // Initialize the controller and a mock scope

        beforeEach(function() {
            angular.mock.module("<%= appname %>App");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
                <%= classedName %>Ctrl = $controller("<%= classedName %>Ctrl", {
                  $scope: scope
                });
              });
        });

        it("should attach title to the scope", function () {
            expect(scope.title).toBe("<%= classedName %> page");
        });
    });
});
