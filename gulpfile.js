var gulp         = require('gulp'),
    notify       = require('gulp-notify'),
    scss         = require('gulp-sass'),
    csslint      = require('gulp-stylelint'),
    cleancss     = require('gulp-clean-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    plumber      = require('gulp-plumber'),
    watch        = require('gulp-watch'),
    del          = require('del'),
    browserSync  = require('browser-sync').create(),
    runSequence  = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer');


// Assumes the following structure:
// ./src


gulp.task('scss', function() {
  return gulp.src('./src/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(plumber())
  .pipe(scss())
  .pipe(cleancss())
  .pipe(sourcemaps.write())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  // .pipe(csslint({
  //   reporters: [
  //     {formatter: 'string', console: true}
  //   ]
  // }))
  .pipe(gulp.dest('./build/styles'))
  .pipe(browserSync.stream());
});


gulp.task('clean', function() {
  del('./build');
});


// gulp.task('build', ['global-scss', 'global-js', 'local-scss', 'local-js', 'pug'],  function(){
gulp.task('build', ['scss'],  function(){
  console.log("Building...")
});


gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['scss']);
});


gulp.task('serve', ['watch'], function() {
  browserSync.init({
    server: "./build"
  });
});


gulp.task('default', function() {
  runSequence('clean', 'build', 'serve');
});
