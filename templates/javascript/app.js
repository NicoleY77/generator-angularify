'use strict';

/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * # <%= scriptAppName %>
 *
 * Main module of the application.
 */
define(["angular","uiRouter", "routeResolver", "lazyLoad"<% if(dependenceConfig){ %>,<%= dependenceConfig%><%}%>], function(angular,uiRouter, routeResolver, lazyLoad<% if(dependenceModule){ %>,<%= dependenceModule %><% } %>){
/**) {
    /**
     * configure the main app module
     * @type {*|module}
     */
    var app = angular.module("<%= scriptAppName %>", [<% if(dependenceConfig){ %><%= dependenceConfig%>,<%}%>
    "ui.router",
    "routeResolver",
    "lazyLoad"
    ]).run(
        ["$rootScope", "$state", "$stateParams", "routeResolver",
            function ($rootScope, $state, $stateParams, routeResolver) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                $rootScope.$on("$stateChangeStart", function (e, target) {
                    routeResolver.route.wrapResolve(target);
                });
            }
        ])
        .config(["$interpolateProvider", "$stateProvider", "$urlRouterProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", "$lazyLoadProvider", function ($interpolateProvider, $stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $lazyLoadProvider) {

            /**
             * configure the ocLazyLoader to use requireJS as the loader
             */
            $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

            $lazyLoadProvider.config({
                asyncLoader: require
            });

            /**
             * override angular default module api for creating components
             * @type {Function|register|register|register}
             */
            app.controller = $controllerProvider.register;
            app.service = $provide.service;
            app.factory = $provide.factory;
            app.filter = $filterProvider.register;
            app.directive = $compileProvider.directive;

            /**
             * get referance to the route method of routeResolverProvider
             * @type {*}
             */
            $urlRouterProvider
                .otherwise('/');

            $stateProvider
                .state('home', {
                    url: '/',
                    resolve: {
                        log: function(){
                            console.log('try here');
                        }
                    }
                })
                .state('about', {
                    url: '/about',
                    files: ['first.service'],
                    resolve: {} //the default value  {}
                })
        }]);

    return app;
});