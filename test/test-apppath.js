/*global describe, before, it, beforeEach */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('Angularify generator appPath option', function () {
    var angular;
    var appPath = 'customAppPath';
    var expected = [
            appPath + '/404.html',
            appPath + '/favicon.ico',
            appPath + '/robots.txt',
            appPath + '/styles/home.scss',
            appPath + '/views/home/home.html',
            appPath + '/index.html',
        '.bowerrc',
        '.editorconfig',
        '.gitignore',
        '.jshintrc',
        'Gulpfile.js',
        'package.json',
        'bower.json'
    ];
    var mockPrompts = {
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: []
    };
    var genOptions = {
        'appPath': appPath,
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
    };

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
            if (err) {
                done(err);
            }

            angular = helpers.createGenerator(
                'angularify:app',
                [
                    '../../app',
                    '../../common',
                    '../../controller',
                    '../../view',
                    '../../home'
                ],
                false,
                genOptions
            );
            helpers.mockPrompt(angular, mockPrompts);

            done();
        });
    });

    describe('App files', function () {
        it('should generate dotfiles for apppath', function (done) {
            angular.run({}, function () {
                helpers.assertFile(expected);
                done();
            });
        });
        it('creates expected JS files', function (done) {
            angular.run({}, function () {
                helpers.assertFile([].concat(expected, [
                        appPath + '/app.js',
                        appPath + '/scripts/controllers/home/home.js',
                    'test/test-main.js',
                    'test/spec/controllers/home/home.spec.js'
                ]));
                done();
            });
        });

        it('creates CoffeeScript files', function (done) {
            if (angular.env.options.coffee) {
                angular.run([], function () {
                    helpers.assertFile([].concat(expected, [
                            appPath + '/app.coffee',
                            appPath + '/scripts/controllers/home/home.coffee',
                        'test/test-main.js',
                        'test/spec/controllers/home.spec.coffee'
                    ]));
                    done();
                });
            } else {
                done();
            }

        });
    });

    describe('Service Subgenerators', function () {
        var generatorTest = function (generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
            var angularGenerator;
            var name = 'foo';
            var deps = [path.join('../..', generatorType)];
            angularGenerator = helpers.createGenerator('angularify:' + generatorType, deps, [name], genOptions);

            angular.run([], function () {
                angularGenerator.run([], function () {
                    helpers.assertFileContent([
                        [
                            path.join(appPath + '/scripts', targetDirectory, name + '.js'),
                            new RegExp(
                                    generatorType + '\\(\'' + scriptNameFn(name) + suffix + '\'',
                                'g'
                            )
                        ]
                    ]);
                    done();
                });
            });
        };

        it('should generate a new controller', function (done) {
            generatorTest('controller', 'controller', 'controllers/foo', _.classify, _.classify, 'Ctrl', done);
        });

        it('should generate a new directive', function (done) {
            generatorTest('directive', 'directive', 'directives', _.camelize, _.camelize, '', done);
        });

        it('should generate a new filter', function (done) {
            generatorTest('filter', 'filter', 'filters', _.camelize, _.camelize, '', done);
        });

        ['constant', 'factory', 'provider', 'value'].forEach(function (t) {
            it('should generate a new ' + t, function (done) {
                generatorTest(t, 'service', 'services', _.camelize, _.camelize, '', done);
            });
        });

        it('should generate a new service', function (done) {
            generatorTest('service', 'service', 'services', _.capitalize, _.capitalize, '', done);
        });
    });

    describe('View', function () {
        it('should generate a new view', function (done) {
            var angularView;
            var deps = ['../../view'];
            angularView = helpers.createGenerator('angularify:view', deps, ['foo'], genOptions);

            helpers.mockPrompt(angular, mockPrompts);
            angular.run([], function () {
                angularView.run([], function () {
                    helpers.assertFile([appPath + '/views/foo/foo.html']);
                    done();
                });
            });
        });

        it('should generate a new view in subdirectories', function (done) {
            var angularView;
            var deps = ['../../view'];
            angularView = helpers.createGenerator('angularify:view', deps, ['foo/bar'], genOptions);

            helpers.mockPrompt(angular, mockPrompts);
            angular.run([], function () {
                angularView.run([], function () {
                    helpers.assertFile([appPath + '/views/foo/bar.html']);
                    done();
                });
            });
        });
    });
});
