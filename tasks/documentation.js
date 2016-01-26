var gulp = require('gulp'),
    concat  = require('gulp-concat'),
    doc  = require('gulp-docco');

var path = require('path');

/**
 * Create a single file app.js
 */
module.exports = function() {

  'use strict';

  return gulp
    .src([
      './src/js/**/index.js',
      './src/js/**/**/*.js'
    ])
    .pipe(concat('index.js', {
      newLine: '\n\n----------------------------------------------------------------------------\n\n'
    }))
    .pipe(doc())
    .pipe(gulp.dest('./documentation'))
};
