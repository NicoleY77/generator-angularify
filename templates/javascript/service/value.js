'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Value in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.value('<%= cameledName %>', 42);
    // or use angular.module to create a new module
});
