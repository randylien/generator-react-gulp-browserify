/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('react-gulp-browserify generator basic', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js'
    ];


    helpers.mockPrompt(this.app, {
        features: [
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('react-gulp-browserify generator with Modernizr', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js'
    ];

    helpers.mockPrompt(this.app, {
        features: [
            'includeModernizr'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('bower.json', /modernizr/);
      done();
    });
  });
});

describe('react-gulp-browserify generator with Jade', function () {
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
        'app/index.jade',
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeJade'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('react-gulp-browserify generator with sass', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js',
        'app/styles/main.scss'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeSass'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('react-gulp-browserify generator with stylus', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js',
        'app/styles/main.styl'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeStylus'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});

describe('react-gulp-browserify generator with jQuery', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includejQuery'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('bower.json', /jquery/);
      done();
    });
  });
});


describe('react-gulp-browserify generator with bootstrap', function () {
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
        'app/scripts/ui/Timer.js',
        'app/scripts/app.js'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeBootstrap'
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('bower.json', /bootstrap/);
      helpers.assertFileContent('bower.json', /jquery/);
      done();
    });
  });
});

describe('react-gulp-browserify generator with coffeescript', function () {
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
        'gulpfile.coffee',
        'app/index.html',
        'app/scripts/ui/Timer.coffee',
        'app/scripts/app.coffee'
    ];


    helpers.mockPrompt(this.app, {
        features: [
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

describe('react-gulp-browserify generator with jade, modernizr, bootstrap, sass, and coffeescript', function () {
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
        'gulpfile.coffee',
        'app/template/index.jade',
        'app/scripts/ui/Timer.coffee',
        'app/scripts/app.coffee',
        'app/styles/main.scss'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeSass',
            'includeBootstrap',
            'includeModernizr',
            'includeJade',
            'includeCoffeeScript',
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('bower.json', /bootstrap/);
      helpers.assertFileContent('bower.json', /sass/);
      helpers.assertFileContent('bower.json', /modernizr/);
      helpers.assertFileContent('bower.json', /jquery/);
      done();
    });
  });
});

describe('react-gulp-browserify generator with jade, modernizr, bootstrap, stylus, and coffeescript', function () {
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
        'gulpfile.coffee',
        'app/index.jade',
        'app/scripts/ui/Timer.coffee',
        'app/scripts/app.coffee',
        'app/styles/main.styl'
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeStylus',
            'includeBootstrap',
            'includeModernizr',
            'includeJade',
            'includeCoffeeScript',
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      helpers.assertFileContent('bower.json', /jquery/);
      helpers.assertFileContent('bower.json', /modernizr/);
      helpers.assertFileContent('bower.json', /bootstrap/);
      helpers.assertFileContent('bower.json', /stylus/);
      done();
    });
  });
});
