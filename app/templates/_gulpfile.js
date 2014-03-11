'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();

<% if (includeSass) { %>
// Styles
gulp.task('sass', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            loadPath: ['app/bower_components']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});
<% } %>

<% if (includeStylus) { %>
// Stylus compile
gulp.task('stylus', function () {
    return gulp.src('app/styles/**/*.styl')
        .pipe($.stylus({
            set:['compress']
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

<% } %>

<% if (includeCoffeeScript) { %>
// CoffeeScript
gulp.task('coffee', function () {
    return gulp.src('app/coffee/**/*.coffee')
        .pipe(
            $.coffee({ bare: true }).on('error', $.util.log)
        )
        .pipe(gulp.dest('app/scripts'));
});
<% } %>

// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/**/*.css')
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Scripts
gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.react())
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
    });

<% if (includeJade) { %>

gulp.task('jade', function () {
    return gulp.src('app/template/*.jade')
        .pipe($.jade({ pretty: true }))
        .pipe(gulp.dest('dist'))
        .pipe($.connect.reload());
})

<% } %>

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Clean
gulp.task('clean', function () {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts'], $.bundle('./app/*.html'));

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

// Connect
gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));


gulp.task('bower', function() {
    gulp.src('app/bower_components/**/*.js', {base: 'app/bower_components'})
        .pipe(gulp.dest('dist/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json', {base: 'app/scripts'})
        .pipe(gulp.dest('dist/scripts/'));
});


// Watch
gulp.task('watch', ['connect'], function () {

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

<% if (includeJade) { %>
    // Watch .jade files
    gulp.watch('app/template/**/*.jade', ['jade', 'html']);
<% } %>
<% if (includeStylus) { %>
    // Watch .stylus files
    gulp.watch('app/styles/**/*.styl', ['stylus', 'styles']);
<% } %>
<% if (includeCoffeeScript) { %>
    // Watch .coffeescript files
    gulp.watch('app/scripts/**/*.coffee', ['coffee', 'scripts']);
<% } %>
    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
