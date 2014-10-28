"use strict";

define([
    "angular",
    "js/<%= pathLink %>",
    "mock"
], function (angular, <%= cameledName %>, mock){

    describe("Filter: <%= cameledName %>", function () {


      // initialize a new instance of the filter before each test
      var <%= cameledName %>;

      beforeEach(function() {
        // load the filter"s module
        angular.mock.module("<%= appname %>App");
        angular.mock.inject(function ($filter) {
            <%= cameledName %> = $filter("<%= cameledName %>");
        })
      });

      it("should return the input prefixed with <%= cameledName %> filter:", function () {
        var text = "angularjs";
        expect(<%= cameledName %>(text)).toBe("<%= cameledName %> filter: " + text);
      });
    });
});
