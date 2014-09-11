/*global describe, before, it, beforeEach */
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;

describe('Angularify generator route mechanism', function () {
    var angular;
    var route = 'simpleroute';
    var expected = [
            'app/scripts/controllers/' + route + '/' + route + '.js',
            'test/spec/controllers/' + route + '/' + route + '.spec.js',
            'test/test-main.js',
            'app/views/' + route + '/' + route + '.html'
    ];
    var genOptions = {
        'appPath': 'app',
        'skip-install': true,
        'skip-welcome-message': true,
        'skip-message': true
    };
    var mockPrompts = {
        compass: true,
        bootstrap: true,
        compassBootstrap: true,
        modules: ['routeModule']
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
                    '../../home',
                    '../../route',
                    '../../view'
                ],
                false,
                genOptions
            );
            helpers.mockPrompt(angular, mockPrompts);
            angular.run({}, function () {
                angular = helpers.createGenerator(
                    'angularify:route',
                    [
                        '../../controller',
                        '../../route',
                        '../../view'
                    ],
                    [route],
                    genOptions
                );
                helpers.mockPrompt(angular, mockPrompts);
                done();
            });
        });
    });

    describe('create routes', function () {
        it('should generate default route items', function (done) {
            angular.run({}, function (e) {
                helpers.assertFile(expected);
                helpers.assertFileContent(
                    'app/app.js',
                    new RegExp('state\\(\'' + route + '\'')
                );
                done();
            });
        });

        // Test with URI specified explicitly
        it('should generate route items with the route uri given', function (done) {
            var state = 'segment1.segment2';

            angular.options.state = state;
            angular.run({}, function () {
                helpers.assertFile(expected);
                helpers.assertFileContent(
                    'app/app.js',
                    new RegExp('state\\(\'' + state + '\'')
                );
                done();
            });
        });
    });
});
