'use strict';

/**
 * @ngdoc service
 * @name <%= scriptAppName %>.firstservice
 * @description
 * # firstservice
 * Service in the <%= scriptAppName %>.
 */
define(['app', 'angular'], function (app, angular) {
    app.service('firstservice', function firstservice() {
        this.greet = "Hello From Greet Module";
        this.getGreet = function () {
            return this.greet;
        }
    });
});
