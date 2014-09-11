'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Constant in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    angular.module('<%= scriptAppName %>')
        .constant('<%= cameledName %>', 42);
});
