"use strict";


require.config({
    baseUrl: "build",
    paths: {
        "angular": "lib/angular.min",
        "uiRouter": "lib/angular-ui-router.min",
        <%= angularModPath %>
        "routeResolver": "js/load/route-resolver",
        "lazyLoad": "js/load/lazy-load",
        "app": "app"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
        ,"uiRouter": {
            deps: ["angular"],
            exports: "uiRouter"
        }<% for(var i = 0 ; i < mods.length; i++)  { %>
        ,<%= mods[i] %>:{
            deps:["angular"],
            exports: <%= mods[i] %>
        }<% } %>
    }
});

require(["app"], function () {
    angular.bootstrap(document, ["<%= scriptAppName %>"]);
});