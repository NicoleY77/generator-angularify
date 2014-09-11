'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.<%= cameledName %>
 * @description
 * # <%= cameledName %>
 * Service in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
   // angular.module('<%= scriptAppName %>')
   app.service('<%= cameledName %>', function <%= cameledName %>() {
        // AngularJS will instantiate a singleton by calling "new" on this function
   });
});
