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
        console.log(chalk.magenta('You\'re using the fantastic React generator. We provide you full JavaScript solution with Sass support!'));

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
                checked: true
            }, {
                name: 'CoffeeScript for JavaScript',
                value: 'includeCoffeeScript',
                checked: true
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
        this.template('_gulpfile.js', 'gulpfile.js');
        this.template('_bower.json', 'bower.json');
        this.template('main.scss', 'app/styles/main.scss');

        this.copy('index.html', 'app/index.html');

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

    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = ReactGulpBrowserifyGenerator;
