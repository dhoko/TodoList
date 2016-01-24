var path         = require('path'),
    gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    concat       = require('gulp-concat'),
    minifyCss    = require('gulp-minify-css'),
    gutil        = require('gulp-util'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

/**
 * Concat our CSS
 */
module.exports = function() {

  'use strict';

  var root = path.resolve('./src/styles');

  gulp.src(root + '/index.css')
    .pipe(plumber())
    .pipe(concat('main.css'))
    .pipe(gutil.env.dist ? minifyCss() : gutil.noop())
    .pipe(gulp.dest('./app/styles/'))
    .pipe(reload({stream: true}));
};
