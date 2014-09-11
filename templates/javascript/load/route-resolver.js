define(["angular"], function (angular) {
    /**
     * this service returns a valid route definition object
     * for the angular route 'when' method
     *
     * @type {*|module}
     */
    angular.module('routeResolver', [])
        .provider('routeResolver', function () {

            this.$get = function () {
                return this;
            };

            /**
             * configuration object
             */
            this.routeConfig = (function () {
                var serviceDirectory = 'js/services/',
                    controllerDirectory = 'js/controllers/',
                    viewsDirectory = 'views/',

                    setServiceDirectory = function (serviceDir) {
                        serviceDirectory = serviceDir + '/';
                    },

                    getServiceDirectory = function () {
                        return serviceDirectory;
                    },

                    setViewsDirectory = function (viewsDir) {
                        viewsDirectory = viewsDir + '/';
                    },

                    getViewsDirectory = function () {
                        return viewsDirectory;
                    },

                    setControllerDirectory = function (controllerDir) {
                        controllerDirectory = controllerDir + '/';
                    },
                    getControllerDirectory = function () {
                        return controllerDirectory;
                    };

                return {
                    setServiceDirectory: setServiceDirectory,
                    getServiceDirectory: getServiceDirectory,
                    setViewsDirectory: setViewsDirectory,
                    getViewsDirectory: getViewsDirectory,
                    setControllerDirectory: setControllerDirectory,
                    getControllerDirectory: getControllerDirectory
                };
            }());

            /**
             * build and return the route defniation object
             */
            this.route = function (routeConfig) {
                var wrapResolve = function (route) {
                    if (route) {
                        // if loader provide check(), then check it


                        var services = route.service;

                        var state = route.name,
                            viewDir = routeConfig.getViewsDirectory() + state + "/",
                            controllDir = routeConfig.getControllerDirectory() + state + "/";

                        route.templateUrl = viewDir + state + ".html";

                        route.controller = state.charAt(0).toUpperCase() + state.slice(1) + "Ctrl";

                        route.resolve = angular.extend(route.resolve || {}, {
                            __load__: ['$q', '$rootScope', function ($q, $rootScope) {

                                /**
                                 * init the dependencies array
                                 * @type {Array}
                                 */
                                var dependencies = [controllDir + state + ".js"];

                                /**
                                 * add services to dependencies array
                                 */
                                if (services) {
                                    var service;
                                    for (service in services) {
                                        if (services.hasOwnProperty(service)) {
                                            dependencies.push(routeConfig.getServiceDirectory() + services[service] + '.js');
                                        }
                                    }
                                }
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        });
                    }
                }
                return {
                    wrapResolve: wrapResolve
                }
            }(this.routeConfig);

//
            /**
             * load the required dependencies, resolve
             * a promise on sucsses
             * @param $q
             * @param $rootScope
             * @param dependencies
             * @returns {Function|promise}
             */
            resolveDependencies = function ($q, $rootScope, dependencies) {
                var defer = $q.defer();
                require(dependencies, function () {
                    defer.resolve();
                    $rootScope.$apply()
                });
                return defer.promise;
            };

        })

});