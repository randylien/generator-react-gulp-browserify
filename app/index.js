'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ReactGulpBrowserifyGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
            }
        });
    },

    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        console.log(chalk.magenta('You\'re using the fantastic React generator. We provide you full JavaScript solution with Sass or Stylus support!'));

        var prompts = [{
            name: 'project',
            message: 'What is this project\'s name?'
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'Sass with Compass',
                value: 'includeSass',
                checked: true
            }, {
                name: 'Stylus',
                value: 'includeStylus',
                checked: false
            }, {
                name: 'jQuery',
                value: 'includejQuery',
                checked: false
            }, {
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: true
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            }, {
                name: 'HTML template - Jade',
                value: 'includeJade',
                checked: false
            }, {
                name: 'CoffeeScript for JavaScript',
                value: 'includeCoffeeScript',
                checked: false
            }, {
                name: 'Jest for unit tests',
                value: 'includeJest',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            this.projectName = answers.project || 'myApp';

            function hasFeature(feat) { return features.indexOf(feat) !== -1; }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeSass = hasFeature('includeSass');
            this.includeStylus = hasFeature('includeStylus');
            this.includejQuery = hasFeature('includejQuery');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeJade = hasFeature('includeJade');
            this.includeCoffeeScript = hasFeature('includeCoffeeScript');
            this.includeJest = hasFeature('includeJest');

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('app');
        this.mkdir('app/scripts');
        this.mkdir('app/scripts/ui');
        if (this.includeJest) {
            this.mkdir('app/scripts/ui/__tests__');
        }
        this.mkdir('app/styles');
        this.mkdir('app/images');

        this.template('_package.json', 'package.json');
        this.template('_bower.json', 'bower.json');

        if (this.includeCoffeeScript) {
            this.template('_gulpfile-coffee.js', 'gulpfile.js');
            this.template('_gulpfile.coffee', 'gulpfile.coffee');
        } else {
            this.template('_gulpfile.js', 'gulpfile.js');
        }

        if (this.includeSass) {
            this.template('main.scss', 'app/styles/main.scss');
        } else if (this.includeStylus) {
            this.template('main.styl', 'app/styles/main.styl');
        } else {
            this.template('main.css', 'app/styles/main.css');
        }

        if (this.includeJade) {
            this.template('index.jade', 'app/template/index.jade');
        } else {
            this.template('index.html', 'app/index.html');
        }

        if (this.includeCoffeeScript) {
            this.copy('app.coffee', 'app/scripts/app.coffee');
            this.copy('ui/Timer.coffee', 'app/scripts/ui/Timer.coffee');
        } else {
            this.copy('app.js', 'app/scripts/app.js');
            this.copy('ui/Timer.js', 'app/scripts/ui/Timer.js');
        }

        if (this.includeJest) {
            this.copy('ui/__tests__/Timer-test.js', 'app/scripts/ui/__tests__/Timer-test.js');
        }
        this.copy('favicon.ico', 'app/favicon.ico');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('robots.txt', 'app/robots.txt');
        this.copy('preprocessor.js', 'preprocessor.js');

    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = ReactGulpBrowserifyGenerator;
