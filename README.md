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

Run `gulp` for building  and navigate to `http://localhost:5000` for preview

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
                  files: ['firstservice'],
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
`r.js`is an optimizing tool for RequireJS ,  how to integrate AngularJS and Requirejs .

Define config in `main.js`,   all dependencies are in `build`

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
only load `require.js` in `index.html` ,  using r.js  bundle everything into one file named `bundle.js` 

```html
<script src="/lib/require.js" data-main="/bundle.js"></script>
```
## LazyLoad
With [ocLazyLoad](https://github.com/ocombe/ocLazyLoad) ,  ui-router can lazy load files on demand .  But I wanted to simplify the `state` config  at same time . For instance , if specifying the state name `list`

```javascript
$stateProvider
                .state('list', {
                  url: '/list',
                  files: ['firstservice'],
                  resolve: {}
                })
```

Once the `stateChangeStart` event fires and target state name is `list`,  the `templateUrl` and  `controller` of targeted state with the scenario is to define to a given path and name. Then add `load`  to 'resolve' property and assign it a function that  returns a `promise`.  The function can ensure the controller and dependences `files`  are loaded in the proper order. Ultimately the `stateConfig` object will be shown below
 
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

The dependences file support service, filter and directive,  you just need to add the prefix ( component's feature for short + : ) to the file name

```javascript
files: [
	s:	serviceFileName, //service
	f:	filterFileName,  //filter
	d:	directiveFileName //directive
]
```

 which defaults to the  follwing directories :
 
*  service:  				`js/services/`
*  filters:                	`js/filters/`
 * directives: 			`js/directives/`

  If  you assign nothing to the prefix,  default component's feature is service(s:)

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