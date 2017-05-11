const
gulp = require('gulp'),
JSuglify = require('gulp-uglify'),
CSSuglify = require('gulp-uglifycss'),
browserify = require('gulp-browserify'),
concat = require('gulp-concat'),
babel = require('gulp-babel'),
download = require('gulp-download'),
insert = require('gulp-insert'),
runSequence = require('run-sequence')
;

/* Lists and variables */

const filesToFetch = [
  "http://explaain-use.herokuapp.com/explaain.js",
  "http://explaain-app.herokuapp.com/style.css",
  "http://explaain-api.herokuapp.com/templates"
];

const JSFilesToCompile = [
  'public/data/allParties.js',
  'public/data/partyStories.js',
  'public/data/euRefResults.js',
  'public/data/partyStances.js',
  'public/data/ge2015Results.js',
  'public/data/constituencyOdds.js',
  'public/js/jquery.min.js',
  'public/js/slick.min.js',
  'tmp/explaain.js',
  'tmp/index.js'
];

const CSSFilesToCompile = [
  'public/css/bootstrap.css',
  'tmp/style.css',
  'public/css/slick.css',
  'public/css/slick-theme.css',
  //'public/client.css'
];

/* General tasks */



gulp.task('js-cache-templates', function(){
  return gulp.src([
    'tmp/templates'
  ])
  .pipe(insert.prepend('module.exports = '))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('tmp'));
});

gulp.task('js-fetch-external', function(){
  return download(filesToFetch)
	.pipe(gulp.dest("tmp"));
});

/* Production only tasks */

gulp.task('js-build-index-production', function(){
  return gulp.src([
    'views/index.js'
  ])
  .pipe(browserify())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('index.js'))
  .pipe(gulp.dest('tmp'));
});

gulp.task('js-pack-production', function(){
  return gulp.src(JSFilesToCompile)
  .pipe(concat('compiled.js'))
  .pipe(JSuglify())
  .pipe(gulp.dest('public'));
});

gulp.task('css-pack-production', function(){
  return gulp.src(CSSFilesToCompile)
  .pipe(concat('compiled.css'))
  .pipe(CSSuglify())
  .pipe(gulp.dest('public'));
});

gulp.task('build-production', function(done){
  runSequence(
    'js-fetch-external',
    'js-cache-templates',
    'js-build-index-production',
    'js-pack-production',
    'css-pack-production',
    function() {
      done();
    }
  )
});

/* Development only tasks */

gulp.task('js-build-index-development', function(){
  return gulp.src([
    'views/index.js'
  ])
  .pipe(browserify())
  .pipe(concat('index.js'))
  .pipe(gulp.dest('tmp'));
});

gulp.task('js-pack-development', function(){
  return gulp.src(JSFilesToCompile)
  .pipe(concat('compiled.js'))
  .pipe(gulp.dest('public'));
});

gulp.task('css-pack-development', function(){
  return gulp.src(CSSFilesToCompile)
  .pipe(concat('compiled.css'))
  .pipe(gulp.dest('public'));
});

gulp.task('build-development', function(done){
  runSequence(
    'js-cache-templates',
    'js-build-index-development',
    'js-pack-development',
    'css-pack-development',
    function() {
      done();
    }
  )
});
