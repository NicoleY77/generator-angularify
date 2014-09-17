'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var angularUtils = require("../util");


var Generator = function Generator(args, options) {

    yeoman.generators.Base.apply(this, arguments);

    this.argument('appname', {type: String, required: false });

    this.appname = this.appname || path.basename(process.cwd());

    this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));


    this.option('app-suffix', {
        desc: 'Allow a custom suffix to be added to the module name',
        type: String,
        required: 'false'
    });

    this.env.options['app-suffix'] = this.options['app-suffix'];
    this.scriptAppName = this.appname + angularUtils.appName(this);

    args = ['home'];

    if (typeof this.env.options.appPath === 'undefined') {
        this.option('appPath', {
            desc: 'Generate CoffeeScript instead of JavaScript'
        });

        this.env.options.appPath = this.options.appPath;

        if (!this.env.options.appPath) {
            try {
                this.env.options.appPath = require(path.join(process.cwd(), 'bower.json')).appPath;
            } catch (e) {
            }
        }
        this.env.options.appPath = this.env.options.appPath || 'app';
        this.options.appPath = this.env.options.appPath;
    }

    this.appPath = this.env.options.appPath;

    if (typeof this.env.options.coffee === 'undefined') {
        this.option('coffee', {
            desc: 'Generate CoffeeScript instead of JavaScript'
        });

        // attempt to detect if user is using CS or not
        // if cml arg provided, use that; else look for the existence of cs
        if (!this.options.coffee &&
            this.expandFiles(path.join(this.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
            this.options.coffee = true;
        }
        this.env.options.coffee = this.options.coffee;
    }

    this.hookFor('angularify', {
        as: "common",
        args: args
    });

    this.hookFor('angularify', {
        as: "home",
        args: args
    });

    this.hookFor('angularify', {
        as: "controller",
        args: args
    });

    this.hookFor('angularify', {
        as: "view",
        args: ["home"]
    });

    this.hookFor('angularify', {
        as: "controller",
        args: ["home"]
    });

    this.on('end', function () {
        this.installDependencies({
            skipInstall: this.options['skip-install'],
            skipMessage: this.options['skip-message'],
            callback: this._injectDependencies.bind(this)
        });

    });

    this.pkg = require('../package.json');
    this.sourceRoot(path.join(__dirname, '../templates/common'));

}

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function welcome() {
    if (!this.options['skip-welcome-message']) {
        this.log(yosay(" Welcome to the angularify generator"));
        this.log(
            chalk.magenta(
                'Out of the box I include Angular, Angular-UI-Router and RequireJS by default'
            )
        );
        this.log(
            chalk.yellow(
                'if you need the angular-router module , go to search generator-angular'
            )
        );
    }
}

Generator.prototype.askForCompass = function askForCompass() {
    var cb = this.async();

    this.prompt([
        {
            type: 'confirm',
            name: 'compass',
            message: 'Would you like to use Sass (with Compass)?',
            default: true
        }
    ], function (props) {
        this.compass = props.compass;
        cb();
    }.bind(this));
};

Generator.prototype.askForBootstrap = function askForBootstrap() {
    var compass = this.compass;
    var cb = this.async();

    this.prompt([
        {
            type: 'confirm',
            name: 'bootstrap',
            message: 'Would you like to include Bootstrap?',
            default: true
        },
        {
            type: 'confirm',
            name: 'compassBootstrap',
            message: 'Would you like to use the Sass version of Bootstrap?',
            default: true,
            when: function (props) {
                return props.bootstrap && compass;
            }
        }
    ], function (props) {
        this.bootstrap = props.bootstrap;
        this.compassBootstrap = props.compassBootstrap;
        cb();
    }.bind(this));
};

Generator.prototype.askForAngularModules = function askForAngularModules() {
    var cb = this.async();

    var prompts = [
        {
            type: 'checkbox',
            name: 'modules',
            message: 'Which modules would you like to include?',
            choices: [
                {
                    value: 'animateModule',
                    name: 'angular-animate.js',
                    checked: true
                },
                {
                    value: 'cookiesModule',
                    name: 'angular-cookies.js',
                    checked: true
                },
                {
                    value: 'resourceModule',
                    name: 'angular-resource.js',
                    checked: true
                },
                {
                    value: 'sanitizeModule',
                    name: 'angular-sanitize.js',
                    checked: true
                },
                {
                    value: 'touchModule',
                    name: 'angular-touch.js',
                    checked: true
                }
            ]
        }
    ];

    this.prompt(prompts, function (props) {
        var hasMod = function (mod) {
            return props.modules.indexOf(mod) !== -1;
        };
        this.animateModule = hasMod('animateModule');
        this.cookiesModule = hasMod('cookiesModule');
        this.resourceModule = hasMod('resourceModule');
        this.sanitizeModule = hasMod('sanitizeModule');
        this.touchModule = hasMod('touchModule');

        var angMods = [];

        if (this.animateModule) {
            angMods.push("\"ngAnimate\"");
        }

        if (this.cookiesModule) {
            angMods.push("\"ngCookies\"");
        }

        if (this.resourceModule) {
            angMods.push("\"ngResource\"");
        }

        if (this.sanitizeModule) {
            angMods.push("\"ngSanitize\"");
        }

        if (this.touchModule) {
            angMods.push("\"ngTouch\"");
        }

        if (angMods.length) {
            this.env.options.angMods = angMods;
            this.env.options.angularDeps = angMods.join(',');
        }
        cb();
    }.bind(this));
};

Generator.prototype.readIndex = function readIndex() {
    this.ngRoute = this.env.options.ngRoute;
    this.indexFile = this.engine(this.read('app/index.html'), this);
};

Generator.prototype.appCssFiles = function appCssFiles() {
    var cssFile = 'styles/home.' + (this.compass ? 's' : '') + 'css';
    this.copy(
        path.join('app', cssFile),
        path.join(this.appPath, cssFile)
    );
};

Generator.prototype.createIndexHtml = function createIndexHtml() {
    this.indexFile = this.indexFile.replace(/&apos;/g, "'");
    this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

Generator.prototype.packageFiles = function packageFiles() {
    this.coffee = this.env.options.coffee;
    this.jsExt = this.coffee ? 'coffee' : 'js';
    this.template('root/_karma', 'karma.conf.js');
    this.template('root/_bower.json', 'bower.json');
    this.template('root/_bowerrc', '.bowerrc');
    this.template('root/_package.json', 'package.json');

    var _mods = this.env.options.angMods || [],
        _bowerList = []; // for karma

    _mods = _mods.concat(['mocks', 'scenario']);
    for (var i = 0; i < _mods.length; i++) {
        _bowerList.push("'bower_components/angular-" + _mods[i].replace(/'|"|ng/g, '').toLowerCase() + "/**.js'");
    }

    this.bowerList = _bowerList.join(",");
    this.template('root/_gulpfile', 'Gulpfile.js');
};

Generator.prototype._injectDependencies = function _injectDependencies() {
    if (this.options['skip-install']) {
        this.log(
                'After running `npm install & bower install`, inject your front end dependencies' +
                '\ninto your source code by running:' +
                '\n' +
                '\n' + chalk.yellow.bold('gulp views')
        );
    }
};

module.exports = Generator;
