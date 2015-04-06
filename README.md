# generator-react-gulp-browserify [![Build Status](https://secure.travis-ci.org/randylien/generator-react-gulp-browserify.png?branch=master)](https://travis-ci.org/randylien/generator-react-gulp-browserify)

> [Yeoman](http://yeoman.io) generator for facebook's React framework - Integrate with gulp and browserify.

## What's new?

* Added watchify support
* We use browserify extension instead of gulp extension
* Autorun `bower install` & `npm install` by default


## What's inside?

Bundled:

* Gulp
* Bower
* jQuery
* Browserify
* Reactify - Help to transform JSX (consider to use babelify later)
* watchify support!
* livereload (BrowserSync)

Optional:

* Sass with Compass
* Bootstrap - Twitter Bootstrap's official Sass version
* Modernizr
* Jade for HTML templates
* CoffeeScript for JavaScript
* Jest for unit tests

## Getting Started

```
$ npm install -g yo                                # Install Yeoman (if you don't have it yet)...
$ npm install -g generator-react-gulp-browserify   # ...then install this generator...
$ yo react-gulp-browserify                         # ...and run it.
```

If you chose to use sass, you'll need to install it with `gem install sass`.
If you find your css build results are empty, update your sass gem.

## Output folders 

scripts - /scripts
styles - /styles
fonts - /fonts 


Now, when everything is ready, run the watch task and begin to develop your React components.

```
$ gulp watch
```

How to run test?  
Currently, I prefer to run test tasks from npm. Please run this command.
```
$ npm test
```

After development, you can run this task to generate production code.
```
$ gulp build
```

## License

MIT
