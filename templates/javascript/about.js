'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the <%= scriptAppName %>
 */

define(['app', 'angular'], function (app, angular) {

    app.controller('AboutCtrl', ["$scope", "firstservice", function ($scope, firstservice) {
        $scope.title = "About page"
        $scope.sayHello = firstservice.getGreet();
    }]);

    //also can use angular.module
});

