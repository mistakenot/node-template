require('./global');

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');
var asyncPipe = require('gulp-async-func-runner');

gulp.task('utests', () => {
  return gulp
    .src('tests/unit/**')
    .pipe(
      jasmine({
        verbose: true,
        includesStackTrace: true
      })
    );
});

gulp.task('itests', () => {
  return gulp
    .src('tests/integration/**')
    .pipe(
      jasmine({
        verbose: true,
        includesStackTrace: true
      })
    );
});

gulp.task('tests', ['utests', 'itests']);

gulp.task('default', []);
