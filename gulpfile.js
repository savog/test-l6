/**
 * Created by savo on 22.2.16..
 */

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    proxy = require('http-proxy-middleware'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    scssLint = require('gulp-scss-lint');

gulp.task('local-server', function () {
    connect.server({
        port: 8000,
        livereload: {
            port: 35734, enable: true
        },
        root: 'app',
        middleware: function (connect, opt) {
            return [
                proxy('/svc2/bingomaster/last_draw', {
                    target: 'http://lucky6.premierbet.me/',
                    changeOrigin: true
                    //ws: true      // <-- set it to 'true' to proxy WebSockets
                })
            ]
        }
    });
});

// Compile Sass to CSS
gulp.task('sass', function () {
    return gulp.src('./app/assets/scss/**/*.scss')
        .pipe(connect.reload())
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/assets/css/'));
});

// HTML task
gulp.task('html', function () {
    return gulp.src('./app/*.html')
        .pipe(connect.reload());
});

//Js task
gulp.task('js', function () {
    return gulp.src('./app/**/*.js')
        .pipe(connect.reload());
});

//Watch task
gulp.task('watch', function () {
    gulp.watch('./app/assets/scss/**/*.scss', ['scss-lint', 'sass']);
    gulp.watch(['./app/**/*.html'], ['html']);
    gulp.watch(['./app/**/*.js'], ['js', 'js-lint']);
});

gulp.task('default', ['sass', 'local-server', 'js-lint', 'scss-lint', 'watch']);

// Analyze code
gulp.task('js-lint', function () {
    return gulp.src(['./app/**/*.js', '!./app/lib/**/*', '!./app/jspm-config.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish));
});

gulp.task('scss-lint', function () {
    return gulp.src(['./app/assets/scss/**/*.scss', '!./app/assets/scss/base/**/*.scss'])
        .pipe(scssLint({
            'config': './app/assets/scss/.scss-lint.yml'
        }));
});