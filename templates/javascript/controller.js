'use strict';

/**
 * @ngdoc function
 * @name <%= scriptAppName %>.controller:<%= classedName %>Ctrl
 * @description
 * # <%= classedName %>Ctrl
 * Controller of the <%= scriptAppName %>
 */

define(['app', 'angular'], function (app, angular) {
    app.controller('<%= classedName %>Ctrl', ["$scope", function ($scope) {
        $scope.title = "<%= classedName %> page"
    }]);
    // ...
    //or use angular.module to create a new module
});

