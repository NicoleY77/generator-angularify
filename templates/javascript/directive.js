'use strict';

/**
 * @ngdoc directive
 * @name <%= scriptAppName %>.directive:<%= cameledName %>
 * @description
 * # <%= cameledName %>
 */
define(['app', 'angular'], function (app, angular) {
    app.directive('<%= cameledName %>', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the <%= cameledName %> directive');
            }
        };
    });
    // or use angular.module to create a new module
});
