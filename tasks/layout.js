var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    browserSync = require('browser-sync'),
    reload      = browserSync.reload;

module.exports = function() {
  gulp.src('./src/layout.html')
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./app/'))
    .pipe(reload({stream: true}));
};
