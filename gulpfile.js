const
gulp = require('gulp'),
JSuglify = require('gulp-uglify'),
CSSuglify = require('gulp-uglifycss'),
browserify = require('gulp-browserify'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
download = require('gulp-download')
;

gulp.task('js-prepare', function(){
  return gulp.src([
    'views/index.js'
  ])
  .pipe(browserify())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('temp'));
});

gulp.task('js-fetch', function(){
  return download([
    "http://explaain-use.herokuapp.com/explaain.js",
    "http://explaain-app.herokuapp.com/style.css",
    "http://explaain-api.herokuapp.com/templates"
  ])
	.pipe(gulp.dest("temp/"));
});

gulp.task('js-pack', function(){
  return gulp.src([
    'public/data/allParties.js',
    'public/data/partyStories.js',
    'public/data/euRefResults.js',
    'public/data/partyStances.js',
    'public/data/ge2015Results.js',
    'public/js/jquery.min.js',
    'public/js/slick.min.js',
    'temp/explaain.js',
    'temp/bundle.js'
  ])
  .pipe(concat('production.js'))
  .pipe(JSuglify())
  .pipe(gulp.dest('public'));
});

gulp.task('css-pack', function(){
  return gulp.src([
    'public/css/bootstrap.css',
    'temp/style.css',
    'public/css/slick.css',
    'public/css/slick-theme.css',
    'public/client.css'
  ])
  .pipe(concat('production.css'))
  .pipe(CSSuglify())
  .pipe(gulp.dest('public'));
});

gulp.task('build', [ 'js-fetch','js-prepare' ],function () {
  gulp.start('js-pack','css-pack');
});
