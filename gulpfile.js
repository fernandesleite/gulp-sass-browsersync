var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var bs = browserSync.create();
var autoprefixer = require('gulp-autoprefixer')

// Inits browserSync server
gulp.task('browserSync', function(){
	bs.init({
		server: "./"
	});
});

// Compile files from scss to css
gulp.task('sass', function(){
	return gulp.src('./scss/main.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('./css'))
	.pipe(bs.stream());
});

// Watch files changes
gulp.task('watch', function(){
	gulp.watch('./scss/*.scss', ['sass']);
	gulp.watch('./*.html').on('change', bs.reload);
	gulp.watch('./js/*.js').on('change', bs.reload);
});

gulp.task('default', ['browserSync', 'watch']);

