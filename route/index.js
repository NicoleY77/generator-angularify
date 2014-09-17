'use strict';
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);

    var bower = require(path.join(process.cwd(), 'bower.json'));
    var match = require('fs').readFileSync(path.join(
        this.env.options.appPath,
            'app.' + (this.env.options.coffee ? 'coffee' : 'js')
    ), 'utf-8').match(/\.state/);

    if (
        bower.dependencies['angular-ui-router'] ||
        bower.devDependencies['angular-ui-router'] ||
        match !== null
        ) {
        this.foundWhenForRoute = true;
    }

    this.hookFor('angularify:controller');
    this.hookFor('angularify:view');
};

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
    var coffee = this.env.options.coffee;

    if (!this.foundWhenForRoute) {
        this.on('end', function () {
            this.log(chalk.yellow(
                    '\nangular-ui-router is not installed. Skipping adding the route to ' +
                    'scripts/app.' + (coffee ? 'coffee' : 'js')
            ));
        });
        return;
    }

    this.state = this.name;
    if (this.options.state) {
        this.state = this.options.state;
    }

    var _name = this.name.toLowerCase();

    var config = {
        file: path.join(
            this.env.options.appPath,
                'app.' + (coffee ? 'coffee' : 'js')
        ),
        needle: '$stateProvider',
        splicable: [
                "  url: '/" + _name + "',",
                "  files: ['first.service'],",
                "  resolve: {}"
        ]
    };

    if (coffee) {
        config.splicable.unshift(".state '" + this.state + "',");
    }
    else {
        config.splicable.unshift(".state('" + this.state + "', {");
        config.splicable.push("})");
    }

    angularUtils.rewriteFile(config);
};
