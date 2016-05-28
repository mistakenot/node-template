require('./global');

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jasmine = require('gulp-jasmine');
var asyncPipe = require('gulp-async-func-runner');

gulp.task('utests', () => {
  console.log("Starting unit tests...");
  return gulp
    .src('tests/unit/**')
    .pipe(
      jasmine({
        verbose: true,
        includesStackTrace: true
      })
    );
});

gulp.task('itests', ['start-server'], () => {
  console.log("Starting integration tests...");
  return gulp
    .src('tests/integration/**')
    .pipe(
      jasmine({
        verbose: true,
        includesStackTrace: true
      })
    );
});

gulp.task('start-server', () => {
  console.log('Starting server...');
});

gulp.task('stop-server', () => {
  console.log('Stoping server...');
});

gulp.task('tests', ['utests', 'itests']);

gulp.task('default', []);
