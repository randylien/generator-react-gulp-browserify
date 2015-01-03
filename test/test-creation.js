/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('react-gulp-browserify generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('react-gulp-browserify:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
        '.jshintrc',
        '.editorconfig',
        'bower.json',
        'package.json',
        'gulpfile.js',
        'app/index.html',
        'app/scripts/ui/Timer.coffee',
        'app/scripts/app.coffee'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeSass',
            'includeBootstrap',
            'includeModernizr',
            'includeJade',
            'includeCoffeeScript'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
