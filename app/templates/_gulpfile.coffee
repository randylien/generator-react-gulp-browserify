rebundle = ->
  bundler.bundle().on("error", $.util.log.bind($.util, "Browserify Error")).pipe(source(destFileName)).pipe(gulp.dest(destFolder)).on "end", ->
    reload()

"use strict"
gulp = require("gulp")
del = require("del")
<% if (includeJest) { %>path = require("path")<% } %>

# Load plugins

$ = require("gulp-load-plugins")()
browserify = require("browserify")
watchify = require("watchify")
source = require("vinyl-source-stream")
sourceFile = "./app/scripts/app.coffee"
destFolder = "./dist/scripts"
destFileName = "app.js"
browserSync = require("browser-sync")
reload = browserSync.reload

# Styles

gulp.task "styles", [
 <% if (includeSass) { %> "sass"<% } %>
 <% if (includeStylus) { %> "stylus"<% } %>
  "moveCss"
]

gulp.task "moveCss", [ "clean" ], ->
  # the base option sets the relative root for the set of files,
  # preserving the folder structure
  gulp.src([ "./app/styles/**/*.css" ], base: "./app/styles/").pipe gulp.dest("dist/styles")

<% if (includeSass) { %>
gulp.task "sass", ->
  $.rubySass("./app/styles",
    style: "expanded"
    precision: 10
    loadPath: [ "app/bower_components" ]).pipe($.autoprefixer("last 1 version")).pipe(gulp.dest("dist/styles")).pipe $.size()
<% } if (includeStylus) { %>

gulp.task "stylus", ->
  gulp.src([ "app/styles/**/*.styl" ]).pipe($.stylus()).pipe($.autoprefixer("last 1 version")).pipe(gulp.dest("dist/styles")).pipe $.size()

<% } %>

bundler = watchify(browserify(
  entries: [ sourceFile ]
  debug: true
  insertGlobals: true
  cache: {}
  packageCache: {}
  fullPaths: true))

bundler.on "update", rebundle
bundler.on "log", $.util.log

# Scripts

gulp.task "scripts", rebundle

gulp.task "buildScripts", ->
  browserify(sourceFile).bundle().pipe(source(destFileName)).pipe gulp.dest("dist/scripts")

<% if (includeJade) { %>

gulp.task "jade", ->
  gulp.src("app/template/*.jade").pipe($.jade(pretty: true)).pipe gulp.dest("dist")

<% } %>

# HTML

gulp.task "html", ->
  gulp.src("app/*.html").pipe($.useref()).pipe(gulp.dest("dist")).pipe $.size()

# Images

gulp.task "images", ->
  gulp.src("app/images/**/*").pipe($.cache($.imagemin(
    optimizationLevel: 3
    progressive: true
    interlaced: true))).pipe(gulp.dest("dist/images")).pipe $.size()

# Fonts

gulp.task "fonts", ->
  gulp.src(require("main-bower-files")(filter: "**/*.{eot,svg,ttf,woff,woff2}").concat("app/fonts/**/*")).pipe gulp.dest("dist/fonts")

# Clean

gulp.task "clean", (cb) ->
  $.cache.clearAll()
  cb del.sync([
    "dist/styles"
    "dist/scripts"
    "dist/images"
  ])

# Bundle

gulp.task "bundle", [
  "styles"
  "scripts"
  "bower"
], ->
  gulp.src("./app/*.html").pipe($.useref.assets()).pipe($.useref.restore()).pipe($.useref()).pipe gulp.dest("dist")

gulp.task "buildBundle", [
  "styles"
  "buildScripts"
  "moveLibraries"
  "bower"
], ->
  gulp.src("./app/*.html").pipe($.useref.assets()).pipe($.useref.restore()).pipe($.useref()).pipe gulp.dest("dist")

# Move JS Files and Libraries

gulp.task "moveLibraries", [ "clean" ], ->
  # the base option sets the relative root for the set of files,
  # preserving the folder structure
  gulp.src([ "./app/scripts/**/*.js" ], base: "./app/scripts/").pipe gulp.dest("dist/scripts")

# Bower helper

gulp.task "bower", ->
  gulp.src("app/bower_components/**/*.js", base: "app/bower_components").pipe gulp.dest("dist/bower_components/")

gulp.task "json", ->
  gulp.src("app/scripts/json/**/*.json", base: "app/scripts").pipe gulp.dest("dist/scripts/")

# Robots.txt and favicon.ico

gulp.task "extras", ->
  gulp.src([
    "app/*.txt"
    "app/*.ico"
  ]).pipe(gulp.dest("dist/")).pipe $.size()

# Watch

gulp.task "watch", [
  "html"
  "fonts"
  "bundle"
], ->
  browserSync
    notify: false
    logPrefix: "BS"
    server: [
      "dist"
      "app"
    ]
  
  # Watch .json files
  
  gulp.watch "app/scripts/**/*.json", [ "json" ]
  
  # Watch .html files
  
  gulp.watch "app/*.html", [ "html" ]
  gulp.watch [
    "app/styles/**/*.scss"
    "app/styles/**/*.css"
    "app/styles/*.styl"
  ], [
    "styles"
    "scripts"
    reload
  ]
  <% if (includeJade) { %>
  # Watch .jade files

  gulp.watch "app/template/**/*.jade", [
    "jade"
    "html"
    reload
  ]
  <% } %>
  # Watch image files

  gulp.watch "app/images/**/*", reload

# Build

gulp.task "build", [
  "html"
  "buildBundle"
  "images"
  "fonts"
  "extras"
], ->
  gulp.src("dist/scripts/app.js").pipe($.uglify()).pipe($.stripDebug()).pipe gulp.dest("dist/scripts")

# Default task

gulp.task "default", [
  "clean"
  "build"
  "jest"
]