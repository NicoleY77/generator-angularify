'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.setupEnv = function setupEnv() {

    var join = path.join;
    this.sourceRoot(join(__dirname, '../templates/common/root'));
    this.copy('.editorconfig');
    this.copy('.gitattributes');
    this.copy('.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.directory('test');

    this.sourceRoot(join(__dirname, '../templates/common'));
    var appPath = this.options.appPath;
    var copy = function (dest, src) {
        src = src || dest;
        this.copy(join('app', src), join(appPath, dest));
    }.bind(this);

    copy('.buildignore');
    copy('404.html');
    copy('favicon.ico');
    copy('robots.txt');
    copy('views/about/about.html', 'views/about.html');
};
