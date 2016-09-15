var gulp = require('gulp')
    , webpack = require('webpack-stream')
    , eslint = require('gulp-eslint')
    , Cache = require('gulp-file-cache')
    , mocha = require('gulp-mocha')
    , babel = require('gulp-babel')
    , nodemon = require('gulp-nodemon')
    , wait = require('gulp-wait');

var cache = new Cache();

gulp.task('compile', function () {
    var stream = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(cache.filter())
        .pipe(webpack(require('./webpack.config')))
        .pipe(cache.cache())
        .pipe(gulp.dest('dist/'));

    return stream;
});

gulp.task('compileTests', function () {
    var stream = gulp.src('tests/*.spec.js')
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
        .pipe(gulp.dest('dist/tests/'));

    return stream;
});

gulp.task('test', ['compile', 'compileTests'], function () {
    var stream = gulp.src('dist/tests/*.spec.js')
        .pipe(mocha({reporter: 'nyan'}));

    return stream;
});

gulp.task('compileServer', function () {
    var stream =
        gulp.src('server.js')
            .pipe(babel({
                presets: ['es2015']
            }))
            .pipe(gulp.dest('dist/'));

    return stream;
});

gulp.task('jade', function () {
    return gulp.src('src/views/*.jade')
        .pipe(gulp.dest('dist/views/'))
});

gulp.task('watch', ['test'], function () {
    var stream = nodemon({
        script: 'dist/server.js',
        watch: ['src', 'tests', 'server.js'],
        tasks: ['jade', 'compileServer', 'compile', 'test']
    });

    return stream
});

gulp.task('default', ['jade', 'compile', 'compileServer', 'test', 'watch']);