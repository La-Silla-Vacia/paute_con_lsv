const gulp = require('gulp');
const pug = require('gulp-pug');
const data = require('gulp-data');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

gulp.task('views', function buildHTML() {
  return gulp.src('src/*.pug')
    .pipe(pug({
      locals: require('./src/data.json')
    }))
    .pipe(
      gulp.dest('./public')
    )
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function() {
  gulp.watch('./src/**/*.scss', ['sass']);
  gulp.watch(['./src/*.pug', './src/*.json'], ['views']);
  gulp.watch(['./public/**/*.*']).on('change', browserSync.reload);
});


gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./public"
    }
  });
});

gulp.task('default', ['watch', 'sass', 'browser-sync']);