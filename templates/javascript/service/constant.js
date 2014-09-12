'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Constant in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.constant('<%= cameledName %>', 42);
    // or use angular.module to create a new module
});
