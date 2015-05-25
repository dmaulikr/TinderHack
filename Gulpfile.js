var gulp = require('gulp');
var plumber = require('gulp-plumber');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var gls = require('gulp-live-server');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var babelify = require('babelify');

//paths
var paths = {
  app_js: './client/app/main.js',
  styles: [
    './client/app/styles/*.styl',
  ],
  assets: './client/assets',
  client: './client'
};

gulp.task('assets', copy_assets);
function copy_assets() {
  return gulp.src(paths.assets + '/**')
    .pipe(gulp.dest('server/public/assets'));
}


gulp.task('build:browserify', build_browserify);
function build_browserify() {
  // cleanup
  del(['client/public/**']);

  return browserify({
    entries: [paths.app_js],
    transform: [babelify],
    extensions: ['.js'],
    paths: ['./node_modules', './client/app']
  }).bundle()
    .pipe(plumber())
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadmaps: true}))
    .pipe(gulp.dest('server/public/js'));
};

gulp.task('serve', serve);
function serve() {

    build_browserify();
    copy_assets();

    //2. run script with cwd args, e.g. the harmony flag
    var server = gls.new(['--harmony', 'server/app.js']);
    //this will achieve `node --harmony myapp.js`
    //you can access cwd args in `myapp.js` via `process.argv`
    server.start();

    gulp.watch(['client/**/*'], function(){
      build_browserify();
      copy_assets();
      server.start();
    });

    //use gulp.watch to trigger server actions(notify, start or stop)
    // gulp.watch(['static/**/*.css', 'static/**/*.html'], server.notify);
    gulp.watch(['server/**/*.js'], server.start);
    gulp.watch('app.js', server.start); //restart my server
};



