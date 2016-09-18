var gulp = require('gulp')
    , webpack = require('webpack-stream')
    , eslint = require('gulp-eslint')
    , Cache = require('gulp-file-cache')
    , mocha = require('gulp-mocha')
    , babel = require('gulp-babel')
    , nodemon = require('gulp-nodemon')
    , wait = require('gulp-wait')
    , gutil = require('gulp-util');

var cache = new Cache();

gulp.task('bundle', function () {
    var stream = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(cache.filter())
        .pipe(webpack(require('./webpack.config')))
        .pipe(cache.cache())
        .pipe(gulp.dest('dist/'));

    return stream;
});

gulp.task('compile', function () {
    var stream = gulp.src(['src/**/*.js', 'src/**/*.jsx'])
        .pipe(babel({
            presets: ['es2015', 'react']
        }))
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

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
gulp.task('test', ['compile', 'compileTests'], function () {
    return gulp.src('dist/tests/*.spec.js', {read:false})
        .pipe(mocha({reporter: 'list'}))
        .on('error', handleError);

    // return stream;
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
        tasks: ['jade', 'bundle', 'compileServer', 'compile', 'test']
    });

    return stream
});


gulp.task('wtest', ['test'], function() {
    gulp.watch(['src/**', 'tests/**'], ['test']);
});

gulp.task('default', ['jade', 'bundle', 'compile', 'compileServer', 'test', 'watch']);