'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.first
 * @description
 * # first
 * Service in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('first', function first() {
        this.greet = "Hello From Greet Module";
        this.getGreet = function () {
            return this.greet;
        }
    });
});
