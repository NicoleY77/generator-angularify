/*global describe, before, it, beforeEach */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Angularify generator template mechanism', function () {
    var angular;
    var appName = 'smellyCat';

    beforeEach(function (done) {
        var deps = [
            '../../../app',
            '../../../common',
            '../../../controller',
            '../../../view',
            '../../../home'
        ];
        helpers.testDirectory(path.join(__dirname, 'tmp', appName), function (err) {
            if (err) {
                done(err);
            }

            angular = helpers.createGenerator('angularify:app', deps, [appName], {
                'appPath': 'app',
                'skip-welcome-message': true,
                'skip-install': true,
                'skip-message': true
            });

            helpers.mockPrompt(angular, {
                compass: true,
                bootstrap: true,
                compassBootstrap: true,
                modules: []
            });

            done();
        });
    });

    it('should generate the same appName in every file', function (done) {
        angular.run({}, function () {
            helpers.assertFile([
                'app/app.js',
                'app/scripts/controllers/home/home.js',
                'app/index.html',
                'test/test-main.js',
                'test/spec/controllers/home/home.spec.js'
            ]);

            helpers.assertFileContent(
                'app/app.js',
                new RegExp('module\\(\"' + appName + 'App\"')
            );
            helpers.assertFileContent(
                'app/main.js',
                new RegExp('\\[\"' + appName + 'App\"\\]')
            );
            done();
        });
    });
});
