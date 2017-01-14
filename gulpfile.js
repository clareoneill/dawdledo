/* include gulp */
var gulp = require('gulp');

/* include gulp plugins */
var minify       = require('gulp-minify-css'),
    sass         = require('gulp-sass'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    concat       = require('gulp-concat'),
    jshint       = require('gulp-jshint'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload,
    nodemon      = require('gulp-nodemon');

var watchFiles = [
  'assets/styles/development/scss/**/**/*.scss',
  'assets/scripts/development/**/*.js',
  '**/*.html'
];

/* default task */
gulp.task('default', ['sass', 'lint', 'scripts']);

/* start the browser-sync server */
gulp.task('serve', ['nodemon'], function() {
  browserSync.init(watchFiles, {
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  });
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    script: './express.js',
    ignore: [
      'gulpfile.js',
      'node_modules/'
    ]
  })
    .on('start', function () {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function () {
      setTimeout(function () {
        reload({ stream: false });
      }, 1000);
    });
});

/* compile sass */
gulp.task('sass', function () {
  return gulp.src('assets/styles/development/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers : ['last 2 versions'],
      cascade  : false
    }))
    .pipe(gulp.dest('assets/styles/development/css'))
    .pipe(minify())
    .pipe(rename(function (path) {
      path.extname = '.min.css'
    }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('assets/styles/production'))
    .pipe(reload({stream : true}));
});

/* lint js */
gulp.task('lint', function () {
  return gulp.src('assets/scripts/development/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

/* concatenate scripts */
gulp.task('scripts', function () {
  return gulp.src('assets/scripts/development/*.js')
    .pipe(rename(function (path) {
      path.extname = '.min.js'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('assets/scripts/production'));
});

/* watch for changes */
gulp.task('watch', ['default'], function () {
  gulp.watch(watchFiles, ['default']);
});