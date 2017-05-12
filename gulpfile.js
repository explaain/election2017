/* Building front-end for both Development and Production */

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
watch = require('gulp-watch')
;

/* Lists and variables - feel free to modify */

// Files and folders to be watched during development
const watchFiles = [
  'development/*',
  'views/*',
  'includes/*',
  'models/*',
  'services/*',
  'tests/*',
  'package.json',
  'public/css/*',
  'public/data/*',
  'public/img/*',
  'public/js/*',
  'public/client.css',
];

// Files to fetch from remote services
const filesToFetch = [
  "http://explaain-use.herokuapp.com/explaain.js",
  "http://explaain-app.herokuapp.com/style.css",
  "http://explaain-api.herokuapp.com/templates",
];

// JS Files to compile (babel, browserify)
const JSIndex = [
  'views/index.js'
];

// JS Files to concat and compress
const JSFiles = [
  'public/data/allParties.js',
  'public/data/partyStories.js',
  'public/data/euRefResults.js',
  'public/data/partyStances.js',
  'public/data/ge2015Results.js',
  'public/data/constituencyOdds.js',
  'public/data/partyReconciliation.js',
  'public/js/jquery.min.js',
  'public/js/slick.min.js',
  'tmp/explaain.js',
  'tmp/index.js',
];

// CSS files to concat and compress
const CSSFiles = [
  'public/css/bootstrap.css',
  'tmp/style.css',
  'public/css/slick.css',
  'public/css/slick-theme.css',
  //'public/client.css',
];

/* General tasks */

// This task adds "module.exports = " to templates file
gulp.task('js-prepare-templates', function(){
  return gulp.src([
    'tmp/templates'
  ])
  .pipe(insert.prepend('module.exports = '))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest('tmp'));
});

// This task fetches files from external services
gulp.task('js-fetch-external', function(){
  return download(filesToFetch)
	.pipe(gulp.dest("tmp"));
});

/* Production only tasks */

// This task browserifies index.js and then transcodes it to ES5
gulp.task('js-build-index-production', function(){
  return gulp.src(JSIndex)
  .pipe(browserify())
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('index.js'))
  .pipe(gulp.dest('tmp'));
});

// This task concats and compresses JS for production
gulp.task('js-pack-production', function(){
  return gulp.src(JSFiles)
  .pipe(concat('compiled.js'))
  .pipe(JSuglify())
  .pipe(gulp.dest('public'));
});

// This task concats and compresses CSS for production
gulp.task('css-pack-production', function(){
  return gulp.src(CSSFiles)
  .pipe(concat('compiled.css'))
  .pipe(CSSuglify())
  .pipe(gulp.dest('public'));
});

// This task runs a sequence of tasks for production build
gulp.task('build-production', function(done){
  runSequence(
    'js-fetch-external',
    'js-prepare-templates',
    'js-build-index-production',
    'js-pack-production',
    'css-pack-production',
    function() {
      done();
    }
  )
});

/* Development only tasks */

// This task browserifies index.js
gulp.task('js-build-index-development', function(){
  return gulp.src(JSIndex)
  .pipe(browserify())
  .pipe(concat('index.js'))
  .pipe(gulp.dest('tmp'));
});

// This task concats and compresses JS for production
gulp.task('js-pack-development', function(){
  return gulp.src(JSFiles)
  .pipe(concat('compiled.js'))
  .pipe(gulp.dest('public'));
});

// This task concats and compresses CSS for production
gulp.task('css-pack-development', function(){
  return gulp.src(CSSFiles)
  .pipe(concat('compiled.css'))
  .pipe(gulp.dest('public'));
});

// This task runs the app and watches front-end files
gulp.task('watch-development', function () {
  runSequence('build-development');
  gulp.watch(watchFiles, ['build-development']);
});

// This task runs a sequence of tasks for development build
gulp.task('build-development', function(done){
  console.log("Watch: Files building... " + (new Date()))
  runSequence(
    'js-prepare-templates',
    'js-build-index-development',
    'js-pack-development',
    'css-pack-development',
    function() {
      console.log("Watch: Files built.      " + (new Date()))
      done();
    }
  )
});
