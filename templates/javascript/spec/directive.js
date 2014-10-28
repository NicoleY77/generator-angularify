"use strict";

define([
    "angular",
    "js/<%= pathLink %>",
    "mock"
], function (angular, <%= cameledName %>, mock){

    describe("Directive: <%= cameledName %>", function () {

        // load the directive"s module
        var element,
            scope;

        beforeEach(function() {
            angular.mock.module("<%= appname %>App");
            angular.mock.inject(function ($controller, $rootScope) {
                scope = $rootScope.$new();
            });
        });

        it("should make hidden element visible", angular.mock.inject(function ($compile) {
            element = angular.element("<<%= _.dasherize(name) %>></<%= _.dasherize(name) %>>");
            element = $compile(element)(scope);
            expect(element.text()).toBe("this is the <%= cameledName %> directive");
        }));
    });
 });