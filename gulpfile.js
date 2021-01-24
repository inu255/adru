const gulp = require('gulp'),
      rename = require('gulp-rename'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      browserSync = require('browser-sync').create();


function convertSass(done) {
  gulp.src('./scss/*')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogConsole: true,
      outputStyle: 'compressed'
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({
      // browsers: ['last 2 versions'],
      overrideBrowserslist: ['last 2 version', 'ie 9', 'ios 6', 'android 4'],
      cascade: false,
      grid: 'autoplace'
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream())

  done();
}

function sync(done) {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: 3000
  })
  done();
}

function browserReload(done) {
  browserSync.reload();
  done();
}

function watchAll() {
  gulp.watch("./scss/*", convertSass);
  gulp.watch("./index.html", browserReload);
}

gulp.task('default', gulp.parallel(watchAll, sync));
gulp.task(sync)
