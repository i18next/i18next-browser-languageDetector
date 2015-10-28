var gulp = require('gulp'),
    argv = require('yargs').argv,
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    babel = require('babelify'),
    eslint = require('gulp-eslint'),
    Server = require('karma').Server;

var entry = 'index.js',
    output = 'index.js';

function compile(watch) {
  var bundler = browserify('./lib/' + entry, { debug: argv.debug, standalone: 'i18nextBrowserLanguageDetector' }).transform(babel);
  if (watch) {
    bundle = watchify(bundler);
  }

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source(output))
      .pipe(buffer())
      .pipe(gulpif(!argv.debug, uglify()))
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./bin'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

gulp.task('eslint', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(eslint({
      useEslintrc: true
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: [ 'spec', 'coverage' ],
  }, done).start();
});

gulp.task('test_compat', function (done) {
  new Server({
    configFile: __dirname + '/karma.backward.conf.js'
  }, done).start();
});


gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

function watch() {
  return compile(true);
};

gulp.task('npmPublish', shell.task([
  'npm publish'
]));

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
gulp.task('publish', ['build', 'npmPublish']);
