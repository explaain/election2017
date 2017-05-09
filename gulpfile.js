const
gulp = require('gulp'),
minify = require('gulp-minify'),
uglify = require('gulp-uglify'),
browserify = require('gulp-browserify'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
download = require('gulp-download')
;

gulp.task('js-build', function(){
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
    "http://explaain-use.herokuapp.com/explaain.js"
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
  .pipe(concat('bundle.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public'));
});

gulp.task('default', [ 'js-fetch','js-build' ],function () {
  gulp.start('js-pack');
});
