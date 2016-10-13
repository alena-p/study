var gulp = require('gulp'),
    jade = require('gulp-jade'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    stylus = require('gulp-stylus'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    watch = require('gulp-watch'),
    autoprefixer = require('autoprefixer'),
    postcss = require('gulp-postcss'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano');
    browserSync = require('browser-sync').create();

gulp.task('pages', function () {
    return gulp.src('./_src/jade/**/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(plumber.stop())
        .pipe(gulp.dest('.'));
});

gulp.task('styles', function () {
  return gulp.src([ './_src/style/*.styl' ])
        .pipe(stylus())
        .pipe(gulp.dest('./css'))
});

gulp.task('scripts', function () {
  return gulp.src([ './_src/js/*.js' ])
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', [ 'pages', 'styles', 'scripts', 'browser-sync' ], function () {
    gulp.watch([ './_src/jade/**/*.jade' ], [ 'pages' ]);
    gulp.watch([ './_src/style/*.styl' ], [ 'styles' ]);
    gulp.watch([ './_src/js/*.js' ], [ 'pages', 'scripts' ]);
});
