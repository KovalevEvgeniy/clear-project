const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const concat = require("gulp-concat");
const minify = require('gulp-uglify');
const rename = require('gulp-rename');
const stylus = require('gulp-stylus');
const nib = require('nib');

const config = {
	src: 'src',
	dist: 'htdocs/f'
};

const Tasks = {
	init () {
		gulp.task('build', gulp.series(Tasks.taskJs, Tasks.taskVendorJs, Tasks.taskCss));
		gulp.task('default', gulp.series(Tasks.taskJs, Tasks.taskVendorJs, Tasks.taskCss, Tasks.watch));
	},
	watch (done) {
		// watch js
		gulp.watch(['src/js/components/**/*.js'], gulp.series(Tasks.taskJs));
		gulp.watch(['src/js/vendors/**/*.js'], gulp.series(Tasks.taskVendorJs));

		// watch styl
		gulp.watch(['src/stylus/*.styl', 'src/stylus/**/*.styl'], gulp.series(Tasks.taskCss));

		done();
	},
	taskCss (done) {
		gulp.src('src/stylus/main.styl')
			.pipe(plumber())
			.pipe(stylus({
				use:[nib()]
			}))
			.pipe(gulp.dest(config.dist + '/css'));

		gulp.src('src/stylus/main.styl')
			.pipe(stylus({
				use:[nib()],
				compress: true
			}))
			.pipe(rename('main.min.css'))
			.pipe(gulp.dest(config.dist + '/css'))
			.on('finish', () => {
				Tasks.logMsg('css');
			});

		done();
	},
	taskJs (done) {
		gulp.src(['src/js/components/**/*.js'])
			.pipe(plumber())
			.pipe(concat('main.js'))
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(gulp.dest(config.dist + '/js'))
			.pipe(minify())
			.pipe(rename('main.min.js'))
			.pipe(gulp.dest(config.dist + '/js'))
			.on('finish', () => {
				Tasks.logMsg('js');
			});

		done();
	},
	taskVendorJs (done) {
		gulp.src(config.src + '/js/vendors/**/*.js')
			.pipe(plumber())
			.pipe(concat('vendors.js'))
			.pipe(gulp.dest(config.dist + '/js'))
			.pipe(minify())
			.pipe(rename('vendors.min.js'))
			.pipe(gulp.dest(config.dist + '/js'))
			.on('finish', () => {
				Tasks.logMsg('vendor js');
			});

		done();
	},

	logMsg (text = '') {
		console.log(`finish rebuild task: [${text}]`);
	}
};

Tasks.init();