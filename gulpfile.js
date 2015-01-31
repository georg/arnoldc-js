'use strict';

var gulp = require('gulp');
var del = require('del');
var to5 = require('gulp-6to5');
var transform = require('vinyl-transform');
var browserify = require('browserify');
var rename = require("gulp-rename");
var qunit = require('node-qunit-phantomjs');
var $ = require('gulp-load-plugins')();

gulp.task('script', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  return gulp.src('src/script-handler.js')
    .pipe(browserified)
    .pipe(to5())
    .pipe(rename('arnoldc.script.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('arnoldc', function() {
  var browserified = transform(function(filename) {
    var b = browserify(filename, {standalone: 'arnoldC'});
    return b.bundle();
  });

  return gulp.src('src/arnoldc.js')
    .pipe(browserified)
    .pipe(to5())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['script', 'arnoldc']);

gulp.task('test', function() {
  qunit('test/test-runner.html', { verbose: true });
});

gulp.task('clean', del.bind(null, ['dist/*']));

gulp.task('compress', ['build'], function() {
  gulp.src('dist/arnoldc.js')
    .pipe($.uglify())
    .pipe(rename('arnoldc.min.js'))
    .pipe(gulp.dest('dist'));

  gulp.src('dist/arnoldc.script.js')
    .pipe($.uglify())
    .pipe(rename('arnoldc.script.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['clean', 'compress', 'watch']);

