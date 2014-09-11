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
    angular.module('<%= scriptAppName %>')
        .filter('<%= cameledName %>', function () {
            return function (input) {
                return '<%= cameledName %> filter: ' + input;
            };
        });
});