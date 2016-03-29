'use strict';
const gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  less = require('gulp-less'),
  pleeease = require('gulp-pleeease'),
  replace = require('gulp-replace'),
  wrap = require('gulp-wrap'),
  addSrc = require('gulp-add-src'),
  concat = require('gulp-concat');

gulp.task('js', () => {
  return gulp.src('annotate.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('.'));
});

gulp.task('css', () => {
  return gulp.src('annotate.less')
    .pipe(less())
    .pipe(pleeease({
      minifier: {
        removeAllComments: true
      }
    }))
    .pipe(rename('annotate.min.css'))
    .pipe(gulp.dest('.'));
});

gulp.task('embed-styles', [ 'css' ], () => {
  return gulp.src('annotate.min.css')
    // force all strings to use "" since I'm using '' in embed-styles.js
    .pipe(replace(/\'/g, '"'))
    .pipe(wrap({ src: 'embed-styles.js' }))
    .pipe(addSrc.prepend('annotate.js'))
    .pipe(concat('annotate.styles.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('default', [ 'js', 'embed-styles' ]);
