'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:aboutCtrl
 * @description
 * # aboutCtrl
 * Controller of the <%= scriptAppName %>
 */

define(['app', 'angular'], function (app, angular) {

    app.controller('AboutCtrl', ["$scope", "first", function ($scope, first) {
        $scope.title = "About page";
        $scope.sayHello = first.getGreet();
    }]);

    //also can use angular.module
});

