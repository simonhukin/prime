// include gulp
var gulp = require('gulp');

// include plug-ins
// var gulpLoadPlugins = require("gulp-load-plugins");
// var plugins = gulpLoadPlugins();

var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var jasmine = require('gulp-jasmine');

// JS hint task
gulp.task('jshint', function() {
	gulp.src('./src/js/prime.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
	var imgSrc = './src/images/**/*',
		imgDst = './build/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

// minify new icons
gulp.task('iconmin', function() {
	var icoSrc = './src/*.ico',
		icoDst = './build';

	gulp.src(icoSrc)
		.pipe(changed(icoDst))
		.pipe(imagemin())
		.pipe(gulp.dest(icoDst));

	var icoSrc = './src/*.png',
		icoDst = './build';

	gulp.src(icoSrc)
		.pipe(changed(icoDst))
		.pipe(imagemin())
		.pipe(gulp.dest(icoDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
	var htmlSrc = './src/*.html',
		htmlDst = './build';

	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
	gulp.src('./src/js/*.js')
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
	gulp.src(['./src/css/*.css'])
		.pipe(autoprefix('last 2 versions'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('./build/css/'));
});

//handle test
gulp.task('jasmine', function() {
	gulp.src('./spec/test.js')
		.pipe(jasmine());
});

//handle misc
gulp.task('misc', function() {
	gulp.src('src/css/images/*')
		.pipe(gulp.dest('build/css/images/'));
	gulp.src('src/css/font/*')
		.pipe(gulp.dest('build/css/font/'));
	gulp.src('src/css/*.htc')
		.pipe(gulp.dest('build/css/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'iconmin', 'htmlpage', 'scripts', 'styles', 'jasmine', 'misc'], function() {
// watch for HTML changes
  gulp.watch('./src/*.html', ['htmlpage']);

  // watch for JS changes
  gulp.watch('./src/js/*.js', ['jshint', 'scripts']);

  // watch for CSS changes
  gulp.watch('./src/css/*.css', ['styles']);
});
