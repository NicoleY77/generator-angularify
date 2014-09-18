# Angularify Generator ![travis](https://travis-ci.org/NecoleYu/generator-angularify.svg?branch=feature%2F0.0.1 "https://travis-ci.org/NecoleYu/generator-angularify")

> Yeoman generator for AngularJS -  help you quickly set up a new project , which use UI-Router with RequireJS to load controller , service and so on dynamically. if you require the ngRoute module ,  recommend [generator-angular](https://github.com/yeoman/generator-angular)

## Usage
Install `generator-angular`:

```
npm install -g generator-angularify
```

Make a new directory, and `cd` into it:

```
mkdir my-new-project && cd $_
```

Run `yo angularify`, optionally passing an app name:

```
yo angularify [app-name]
```

Run `gulp` for building  , then run `gulp server` for preview

## Generators

Available generators:

* [angularify](#app) (aka [angularify:app](#app))
* [angularify:controller](#controller)
* [angularify:directive](#directive)
* [angularify:filter](#filter)
* [angularify:route](#route)
* [angularify:service](#service)
* [angularify:provider](#service)
* [angularify:factory](#service)
* [angularify:value](#service)
* [angularify:constant](#service)
* [angularify:decorator](#decorator)
* [angularify:view](#view)

**Note: Generators are to be run from the root directory of your app.**

### App
Sets up a new AngularJS app, generating all the boilerplate you need to get started. The app generator using bower installs `Angular, Angular-UI-Router and RequireJS ` by default , also optionally installs Bootstrap and additional AngularJS modules

Example:

```bash
yo angularify
```
### Route
Generates a controller and view, and configures a route in `app/app.js` connecting them.

Example:

```bash
yo angularify:route myroute
```

Produces `app/scripts/controllers/myroute/myroute.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
    app.controller('ListCtrl', ["$scope", function ($scope) {
        $scope.title = "List page"
    }]);
    // ...
    //or use angular.module to create a new module
});
```

Produces `app/views/myroute/myroute.html`:

```html
<p>This is the myroute view.</p>
<p>{[{title}]}</p>%
```

**Explicitly populate state**

Example:

```bash
yo angular:route myRoute --state=my.route
```

Produces controller and view as above and populate state to `app/app.js`

```javascript
$stateProvider
                .state('my.route', {
                  url: '/myroute',
                  files: 'first.service',
                  resolve: {}
                })
```

if  in doubt about example above,  for more details [lazyLoad](#lazyLoad)

### Controller
Generates a controller in `app/scripts/controllers`.

Example:

```bash
yo angularify:controller user
```

Produces `app/scripts/controllers/user/user.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
    app.controller('UserCtrl', ["$scope", function ($scope) {
        $scope.title = "User page"
    }]);
	// ...
    //or use angular.module to create a new module
});
```
### Directive
Generates a directive in `app/scripts/directives`.

Example:

```bash
yo angularify:directive myDirective
```

Produces `app/scripts/directives/mydirective.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
    app.directive('myDirective', function () {
        return {
            template: '<div></div>',
            restrict: 'E',
            link: function postLink(scope, element, attrs) {
                element.text('this is the myDirective directive');
            }
        };
    });
    // or use angular.module to create a new module
});
```
### Filter
Generates a filter in `app/scripts/filters`.

Example:

```bash
yo angularify:filter myFilter
```

Produces `app/scripts/filters/myfilter.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
    app.filter('myFilter', function () {
        return function (input) {
            return 'myFilter filter: ' + input;
        };
    });
    // or use angular.module to create a new module
});
```

### Service
Generates an AngularJS service.

Example:

```bash
yo angularify:service my
```

Produces `app/scripts/services/my.service.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
   app.service('my', function my() {
        // AngularJS will instantiate a singleton by calling "new" on this function
   });
    // or use angular.module to create a new module
});
```

You can also do `yo angularify:factory`,`yo angularify:provider`, `yo angularify:value`, and `yo angularify:constant` for other types of services.

### Decorator
Generates an AngularJS service decorator.

Example:

```bash
yo angularify:decorator serviceName
```

Produces `app/scripts/decorators/servicename.decorator.js`:

```javascript
define(['app', 'angular'], function (app, angular) {
    app.config(function ($provide) {
        $provide.decorator('serviceName', function ($delegate) {
            // decorate the $delegate
            return $delegate;
        });
    });
    // or use angular.module to create a new module
});
```
## Options
In general, these options can be applied to any generator, though they only affect generators that produce scripts.

### CoffeeScript
todo

### Minification Safe
todo

### Add to Index

By default, `new css` are added to the index.html file.  

## Optimizing JavaScript

To integrate AngularJS and Requirejs :

*  Define config in `main.js`,   all dependencies are in `build` directory

```javascript
require.config({
    baseUrl: "build",
    paths: {
        "angular": "lib/angular.min",
        "uiRouter": "lib/angular-ui-router.min",
        "app": "app"
    },
    shim: {
        "angular": {
            exports: "angular"
        }
        ,"uiRouter": {
            deps: ["angular"],
            exports: "uiRouter"
        }
    }
});
```

*  ```r.js```  is the RequireJS optimizer , which can combine the modules that are specifies in the build profile's file  ,  just like this:

```javascript
{
    mainConfigFile: "build/main.js",
    optimize: "uglify2",
    baseUrl: "build",
    name: "main",
    out: "build/bundle.js",  //output file
    removeCombined: true,
    generateSourceMaps: true,
    preserveLicenseComments: false,
    findNestedDependencies: true
}
```


* Only load `require.js` in `index.html` ,  the  `data-main`  is set to  `bundle.js` , which is  the output  file bundle all above files

```html
<script src="/lib/require.js" data-main="/bundle.js"></script>
```

## LazyLoad
With [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) ,  ui-router can load files on demand.  It's also possibe to simplify the `stateConfig` object like this:

```javascript
$stateProvider
                .state('list', {
                  url: '/list',
                  files: ['first.service'],
                  resolve: {}
                })
```

Once the `stateChangeStart` event fires and target state name is `list`,  the `templateUrl` and  `controller` of target state is assigned a given directory and file name. 

```javascript
	controller:"ListCtrl as list",
	templateUrl:"views/list/list.html"
```

Then `load`  function in the `resolve` object returns a `promise`, which ensures the controller and dependences `files`  are loaded in the proper order. Finally the `stateConfig` object looks like this:
 
```javascript
{
	controller:"ListCtrl as list",
	name:"list",
	templateUrl:"views/list/list.html",
	url:"/list",
	resolve:{
			load: function(){
				//load the controller,service,filter,directive
			}
	}
}
```

The dependences file can include services, filters and directives. 

```javascript
files: {
	s:	"serviceFileName", //service, defaults to "js/services/"
	f:	["filterFileOne","filterFileOne"],  //filter, defaults to  "js/filters/"
	d:	["directiveFileName"] //directive, defaults to "js/directives/"
}
```

## Bower Components

The following packages are always installed by the [app](#app) generator:

* requirejs
* angular
* angular-ui-router
* angular-mocks
* angular-scenario


The following additional modules are available as components on bower, and installable via `bower install`:

* angular-cookies
* angular-resource
* angular-sanitize
* angular-animate
* angular-touch

All of these can be updated with `bower update` as new versions of AngularJS are released.

## Configuration
Yeoman generated projects can be further tweaked according to your needs by modifying project files appropriately.

## Testing
Running `gulp test` will run the unit tests with karma.

## Changelog

## Reference
* [angularjs-styleguide](https://github.com/johnpapa/angularjs-styleguide) 
* [ocLazyLoad](https://github.com/ocombe/ocLazyLoad)
* [CustomerManager](https://github.com/DanWahlin/CustomerManager)