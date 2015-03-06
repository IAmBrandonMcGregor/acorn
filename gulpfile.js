
// Require the external libs and modules.
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon');


// Gulp Task -- default
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
// Starts the tooling.
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
gulp.task('default', ['sass', 'browser-sync'], function () {

	// Re-compile Sass when any .scss files change.
	gulp.watch('app/styles/sass/**/*.scss', ['sass']);

})


// Gulp Task -- browser-sync
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
// Enables live-reload and syncronized browser scrolling. - http://www.browsersync.io
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
gulp.task('browser-sync', ['nodemon'], function startBrowserSync () {
	browserSync({
		ui: false,
		files: ['app/**/*.js', 'app/**/*.html', 'app/**/*.css'],
		proxy: 'localhost:3442',
		online: false,
		browser: ['google chrome canary'],
		reloadOnRestart: true,
		scrollThrottle: 100
	});
});


// Gulp Task -- nodemon
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
// Reloads the NodeJS server when server files change.
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
gulp.task('nodemon', function startNodemon (callback) {

	// Ensure the callback only gets called on the first start event.
	var isStarted = false;

	// Cache some delay variables.
	var reloadTimer = null,
		reloadDelayMilliseconds = 500;

	// Start nodemon.
	return nodemon({
		script: 'bin/www',
		ext: '*.js *.hjs',
		ignore: ['app/**/*.js', 'gulpfile.js']
	})
	.on('start', function onStart() {
		if (!isStarted) {
			isStarted = true;
			callback();
		}
	})
	.on('restart', function onRestart() {

		// ensure we've cleared any existing timeouts.
		clearTimeout(reloadTimer);

		// reload connected browsers.
		reloadTimer = setTimeout(function reload() {
			browserSync.reload({ stream: false });
		}, reloadDelayMilliseconds);
	});

});


// Gulp Task -- compile-stylesheets
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
// Compiles Sass files into CSS and auto-prefixes them.
// - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  - -  --
gulp.task('sass', function compileSass () {
	return gulp.src('app/styles/sass/**/*.scss')
			   .pipe(sass({
			   		outputStyle: 'compressed',
			   		sourceComments: 'map',
			   		errLogToConsole: true
			   	}))
			   .pipe(prefix('last 2 versions', '> 1%', 'ie 8', 'Android 2', 'Firefox ESR'))
			   .pipe(gulp.dest('app/styles/css'))
			   .pipe(browserSync.reload({stream:true}));
});








// THIS SPACE INTENTIONALLY LEFT BLANK.



