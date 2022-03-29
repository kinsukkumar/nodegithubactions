var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass')(require('sass'));
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var rev = require('gulp-rev');
var del = require('del');
var { exec } = require('child_process');
 
// gulp.task('pack-js', () => {    
//     gulp.src(['assets/js/vendor/*.js', 'assets/js/main.js', 'assets/js/module*.js'])
//         .pipe(concat('bundle.js'))
//         .pipe(gulp.dest('public/build/js'));
// });

gulp.task('sass:minified', () => {
    const options = {
        outputStyle: 'compressed',
        precision: 10, // rounding of css color values, etc..
    };

    return gulp.src('./public/stylesheets/scss/bootstrap-theme.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync(options).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false,
        }))
        .pipe(rename({ suffix: '.min'}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./public/compiled-css'))
        .pipe(browserSync.stream()); // Inject css into browser
});


gulp.task('pack-css', () => {   
    return gulp.src(['./public/stylesheets/merge/**.css'])
        .pipe(concat('stylesheet.css'))
        .pipe(cleanCss())
        .pipe(rev())
        .pipe(gulp.dest('./public/compiled-css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./public'));
});

gulp.task('clean-css', () => del(['./public/compiled-css/stylesheet*.css']));

gulp.task('watch:css', () => {
    return gulp.watch('./public/stylesheets/**/*.css', gulp.series('clean-css', 'pack-css', 'sass:minified'));
});

gulp.task('watch:scss', () => {
    return gulp.watch('./public/stylesheets/**/*.scss', gulp.task('sass:minified'));
});

gulp.task('watch', gulp.parallel(['watch:css', 'watch:scss']));
// gulp.watch('assets/js/**/*.js', ['pack-js']);

gulp.task('build', gulp.series('clean-css', 'pack-css', 'sass:minified'));

gulp.task('default', gulp.series('clean-css', 'pack-css', 'sass:minified', 'watch'));
