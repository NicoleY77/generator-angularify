'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Value in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    angular.module('<%= scriptAppName %>')
        .value('<%= cameledName %>', 42);
});
