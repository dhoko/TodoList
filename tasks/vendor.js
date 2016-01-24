var gulp      = require('gulp'),
    gutil     = require('gulp-util'),
    es        = require('event-stream'),
    concat    = require('gulp-concat'),
    minifyCss = require('gulp-minify-css'),
    uglify    = require('gulp-uglify');

/**
 * Build vendor, Concat and build our dependencies
 */
module.exports = function() {

  'use strict';

  var dependencies = './node_modules';

  return es.concat(
    gulp.src([
      dependencies + '/angular/angular.js',
    ])
      .pipe(concat('vendor.min.js', {newLine: "\n;"}))
      .pipe(gutil.env.dist ? uglify({
        output: {
          beautify: false
        }
      }) : gutil.noop())
      .pipe(gulp.dest('app/js'))

  );
};
