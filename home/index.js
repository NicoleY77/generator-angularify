'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
    ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
    var join = path.join;

    this.dependenceConfig = this.env.options.angularDeps;

    this.dependenceModule = (this.dependenceConfig || "").replace(/'|"/gi, '');

    var _temp = this.env.options.angMods || [], _list = [], mods = [];


    for (var i = 0; i < _temp.length; i++) {
        var pth = _temp[i];
        mods.push(pth);
        _list.push(pth + ":'lib/angular-" + pth.replace(/ng/, "").replace(/'|"/g, "").toLowerCase() + ".min'")
    }

    this.angularModPath = _list.length ? _list.join(',\n        ') + ',' : "";
    this.mods = mods;

    var appPath = this.options.appPath;
    this.sourceRoot(join(__dirname, '../templates'));

    var copy = function (dest, src) {
        src = src || dest;
        this.copy(join('javascript', src), join(appPath, dest));
    }.bind(this);

    copy('main.js');
    copy('app.js');

    copy('../test/test-main.js', 'spec/test-main.js');

    copy('scripts/load/lazy-load.js', 'load/lazy-load.js');
    copy('scripts/load/route-resolver.js', 'load/route-resolver.js');

    copy('scripts/controllers/about/about.js', 'about.js');
    copy('scripts/services/firstservice.js', 'firstservice.js');


};
