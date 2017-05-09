const
gulp = require('gulp'),
JSuglify = require('gulp-uglify'),
CSSuglify = require('gulp-uglifycss'),
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
    "http://explaain-use.herokuapp.com/explaain.js",
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css",
    "https://fonts.googleapis.com/css?family=Lato:300,400,700,900",
    "http://explaain-app.herokuapp.com/style.css"
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
    'temp/font-awesome.css',
    'css?family=Lato:300,400,700,900',
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

gulp.task('default', [ 'js-fetch','js-build' ],function () {
  gulp.start('js-pack','css-pack');
});
