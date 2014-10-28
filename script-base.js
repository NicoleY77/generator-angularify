'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');
var chalk = require('chalk');

var Generator = module.exports = function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);
    try {
        this.appname = require(path.join(process.cwd(), 'bower.json')).name;
    } catch (e) {
        this.appname = path.basename(process.cwd());
    }
    this.appname = this._.slugify(this._.humanize(this.appname));
    this.scriptAppName = this._.camelize(this.appname) + angularUtils.appName(this);

    this.fullName = this.name;
    var _name = this.name;
    _name = _name.split("/");
    this.name = _name[_name.length - 1];

    this.cameledName = this._.camelize(this.name);
    this.classedName = this._.classify(this.name);

    this.pathLink = ~this.name.indexOf("/") ? _name.slice(0, _name.length - 1).join("/") : '';

    if (typeof this.env.options.appPath === 'undefined') {
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

    if (typeof this.env.options.testPath === 'undefined') {
        try {
            this.env.options.testPath = require(path.join(process.cwd(), 'bower.json')).testPath;
        } catch (e) {
        }
        this.env.options.testPath = this.env.options.testPath || 'test/spec';
    }

    this.env.options.coffee = this.options.coffee;
    if (typeof this.env.options.coffee === 'undefined') {
        this.option('coffee');

        // attempt to detect if user is using CS or not
        // if cml arg provided, use that; else look for the existence of cs
        if (!this.options.coffee &&
            this.expandFiles(path.join(this.env.options.appPath, '/scripts/**/*.coffee'), {}).length > 0) {
            this.options.coffee = true;
        }

        this.env.options.coffee = this.options.coffee;
    }

    var sourceRoot = '/templates/javascript';
    this.scriptSuffix = '.js';

    if (this.env.options.coffee) {
        sourceRoot = '/templates/coffeescript';
        this.scriptSuffix = '.coffee';
    }

    this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
    yeoman.generators.Base.prototype.template.apply(this, [
            src + this.scriptSuffix,
            path.join(this.env.options.appPath, dest.toLowerCase()) + this.scriptSuffix
    ]);
};

Generator.prototype.testTemplate = function (src, dest) {
    yeoman.generators.Base.prototype.template.apply(this, [
            src + this.scriptSuffix,
            path.join(this.env.options.testPath, dest.toLowerCase()) + this.scriptSuffix
    ]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
    yeoman.generators.Base.prototype.template.apply(this, [
        src,
        path.join(this.env.options.appPath, dest.toLowerCase())
    ]);
};

Generator.prototype.addScriptToIndex = function (script) {
    try {
        var appPath = this.env.options.appPath;
        var fullPath = path.join(appPath, 'index.html');
        angularUtils.rewriteFile({
            file: fullPath,
            needle: '<!-- endbuild -->',
            splicable: [
                    '<script src="scripts/' + script.toLowerCase().replace(/\\/g, '/') + '.js"></script>'
            ]
        });
    } catch (e) {
        this.log.error(chalk.yellow(
                '\nUnable to find ' + fullPath + '. Reference to ' + script + '.js ' + 'not added.\n'
        ));
    }
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory, absolutePath) {
    // Services use classified names

    var name, type, linkPath = this.pathLink;

    name = appTemplate && appTemplate.match("service/") ? this.fullName + "." + appTemplate.replace("service/", "") : this.fullName;

    type = targetDirectory;

    if (absolutePath) {
        targetDirectory = "";
    } else {
        linkPath = type + "/" + linkPath;
    }
    console.log("*************" + linkPath);

    linkPath += name;

    console.log("*************" + linkPath);
    this.pathLink = linkPath;
    this.appTemplate(appTemplate, path.join('scripts', targetDirectory, name));
    this.testTemplate(testTemplate, path.join(targetDirectory, name + ".spec"));
//  this.addScriptToIndex(path.join(targetDirectory, name));
};
