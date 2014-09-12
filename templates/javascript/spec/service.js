"use strict";

define([
    "angular",
    "js/services/<%= fullTypeName %>",
    "mock"
], function (angular, <%= cameledName %>, mock){

    describe("Service: <%= cameledName %>", function () {
      // instantiate service
        var <%= cameledName %>;

      beforeEach(function() {
         // load the service"s module
        angular.mock.module("<%= appname %>App");
        angular.mock.inject(function (_<%= cameledName %>_) {
            <%= cameledName %> = _<%= cameledName %>_;
        });
      });

      it("should do something", function () {
        expect(!!<%= cameledName %>).toBe(true);
      });

    });
});
