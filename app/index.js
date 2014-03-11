'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var ReactGulpBrowserifyGenerator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.npmInstall();
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
                name: 'Stylus with nib',
                value: 'includeStylus',
                checked: true
            }, {
                name: 'CoffeeScript for JavaScript',
                value: 'includeCoffeeScript',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            function hasFeature(feat) { return features.indexOf(feat) !== -1; }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeSass = hasFeature('includeSass');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeStylus = hasFeature('includeStylus');
            this.includeCoffeeScript = hasFeature('includeCoffeeScript');

            done();
        }.bind(this));
    },

    app: function () {
        this.mkdir('app');
        this.mkdir('app/scripts');
        this.mkdir('app/styles');
        this.mkdir('app/images');

        this.template('_package.json', 'package.json');
        this.template('_gulfiles.js', 'gulfiles.js');
        this.copy('_bower.json', 'bower.json');
    },

    projectfiles: function () {
        this.copy('editorconfig', '.editorconfig');
        this.copy('jshintrc', '.jshintrc');
    }
});

module.exports = ReactGulpBrowserifyGenerator;
