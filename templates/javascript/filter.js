'use strict';

/**
 * @ngdoc filter
 * @name <%= scriptAppName %>.filter:<%= cameledName %>
 * @function
 * @description
 * # <%= cameledName %>
 * Filter in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.filter('<%= cameledName %>', function () {
        return function (input) {
            return '<%= cameledName %> filter: ' + input;
        };
    });
    // or use angular.module to create a new module
});