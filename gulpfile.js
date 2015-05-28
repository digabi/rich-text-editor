'use strict';

var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync').create(),
	jshint = require('gulp-jshint');

var	src = {
		sass: 'src/scss/main.scss',
		js: 'src/js/scripts.js'
	},
	dest = {
		css: 'app/assets/css',
		js: 'app/assets/js/'
	};

gulp.task('css', function () {
	return gulp.src(src.sass)
	.pipe(sass({errLogToConsole: true}))
	.pipe(gulp.dest(dest.css))
	.pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function () {
	gulp.src(src.js)
	.pipe(jshint('.jshintrc'))
	.pipe(jshint.reporter('default'))
	.pipe(gulp.dest(dest.js))
	.pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function () {
	browserSync.init(null, {
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('bs-reload', function () {
	browserSync.reload();
});

gulp.task('default', ['css', 'js', 'browser-sync'], function () {
	gulp.watch('app/assets/*/*.*', ['bs-reload']);
	gulp.watch('src/scss/*.scss', ['css']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('app/*.html', ['bs-reload']);
});
