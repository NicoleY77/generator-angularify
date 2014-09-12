'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Provider in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.provider('<%= cameledName %>', function () {

        // Private variables
        var salutation = 'Hello';

        // Private constructor
        function Greeter() {
            this.greet = function () {
                return salutation;
            };
        }

        // Public API for configuration
        this.setSalutation = function (s) {
            salutation = s;
        };

        // Method for instantiating
        this.$get = function () {
            return new Greeter();
        };
    });
    // or use angular.module to create a new module
})
