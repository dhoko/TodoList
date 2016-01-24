var gulp        = require('gulp'),
    tap         = require('gulp-tap'),
    gutil       = require('gulp-util'),
    babel       = require('gulp-babel'),
    concat      = require('gulp-concat'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    cached      = require('gulp-cached'),
    remember    = require('gulp-remember'),
    browserSync = require('browser-sync');
    reload      = browserSync.reload;

/**
 * Create a single file app.js
 */
module.exports = function() {

  'use strict';

  function isDist(cb, opt) {
    if(gutil.env.dist) {
      return cb(opt);
    }

    return gutil.noop();
  }

  function isNotDist(cb, opt) {
    if(!gutil.env.dist) {
      return cb(opt);
    }

    return gutil.noop();
  }


  return gulp
    .src([
      './src/js/**/index.js',
      './src/js/**/**/*.js'
    ])
    .pipe(plumber())
    .pipe(cached())
    .pipe(isNotDist(sourcemaps.init))
    .pipe(babel())
    .pipe(remember())
    .pipe(concat('app.js'))
    .pipe(isDist(uglify, {
      output: {
        quote_style: 1
      }
    }))
    .pipe(isNotDist(sourcemaps.write, './'))
    .pipe(gulp.dest('./app/js'))
    .pipe(reload({stream: true}));
};
