'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var Generator = module.exports = function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.sourceRoot(path.join(__dirname, '../templates/common'));

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
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
    var name = this.name.toLowerCase();
    var destination = path.join(
        this.env.options.appPath,
            'views/' + (name.match(/\//) ? '' : name),
            name + '.html'
    );
    if (this.options['ab']) {
        destination = path.join(
            this.env.options.appPath,
                name + '.html'
        );
    }
    this.template(
        'app/views/view.html',
        destination
    );
};
