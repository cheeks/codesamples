// while it's not really code, I still thought it might be worthwhile to include this as an example of how I set up the evb.com build system

//  gulp
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    size = require('gulp-size'),
    changed = require('gulp-changed');

//  js
var jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    beautify = require('gulp-beautify'),
    sourcemaps = require('gulp-sourcemaps');

//  css
var sass = require('gulp-sass'),
    sassOptions = { includePaths: [] },
    autoPrefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss');

//  server stuff
var nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload');

// lints your js
gulp.task('lint', function () {
  gulp.src('static/app/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// deletes the dist folder
gulp.task('reset', function () {
  gulp.src(['static/dist/js', 'static/dist/css'])
    .pipe(clean());
});

gulp.task('beautify', function () {
  gulp.src('static/app/scripts/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('static/app/scripts'));
  gulp.src('static/app/scripts/views/*.js')
    .pipe(beautify({indentSize: 2}))
    .pipe(gulp.dest('static/app/scripts/views'));
});

// app.js gets browserified, minified, and copied to dist and theme folder
gulp.task('browserify', function () {
  gulp.src(['static/app/scripts/main.js'])
    .pipe(browserify({
      insertGlobals: false,
      debug: true
    }))
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/dist/js'))
    .pipe(size({
      title: 'scripts',
      showFiles: true
    }));
});

// pipes main.scss through sass and autoprefixer, then trims unused css,
// minifies, and finally copies to dist and theme folder
gulp.task('styles', function () {
  return gulp.src([
      'static/app/styles/main.scss'
    ])
    .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(concat('main.css'))
      .pipe(autoPrefixer({browsers: ['> 1%', 'last 2 versions', 'ie 9']}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('static/dist/css/'))
    .pipe(size({ title: 'styles', showFiles: true }))
    .pipe(livereload());
});

// copies images to dist and theme folder
gulp.task('images', function () {
  gulp.src('static/app/images/**/*')
    .pipe(changed('static/dist/images/'))
    .pipe(gulp.dest('static/dist/images/'))
    .pipe(size({ title: 'images' }));
});


// watch the js, html, and css
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['static/app/scripts/*.js', 'static/app/scripts/**/*.js', 'static/app/scripts/**/*.html'], [
    'browserify'
  ]);
  gulp.watch(['static/app/images/**/*'], [
    'images'
  ]);
  gulp.watch(['static/app/styles/**/*.scss'], [
    'styles'
  ]);
  nodemon({ script: 'server.js', ext: 'html js', ignore: [] })
    .on('change')
    .on('restart', function () {
      console.log('restarted!')
  });
  gulp.watch('static/dist/**').on('change', function (file) {
    livereload.changed(file.path);
  });
});


gulp.task('dev',   ['reset', 'images', 'browserify', 'styles', 'watch']);