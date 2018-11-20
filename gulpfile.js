const gulp = require('gulp');
// const watch = require('gulp-watch');
const babel = require("gulp-babel");
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');
const gulpSequence = require('gulp-sequence');
const plumber = require("gulp-plumber");
const eslint = require('gulp-eslint');
// 开发环境
gulp.task('build-dev', () => {
    // return watch('src/nodeuii/**/*.js', {
    //     ignoreInitial: false
    // }, () => {
        return gulp.src('src/nodeuii/**/*.js')
            .pipe(plumber())
            .pipe(babel({
                babelrc: false,
                plugins: [
                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                    "transform-es2015-modules-commonjs"]
                // presets: ['@babel/env']
            }))
            .pipe(plumber())
            .pipe(gulp.dest('dist'))
    // })
});
// 上线环境
gulp.task('build-prod', () => {
    return gulp.src('src/nodeuii/**/*.js')
        .pipe(plumber())
        .pipe(babel({
            babelrc: false,
            plugins: [["@babel/plugin-proposal-decorators", { "legacy": true }],"transform-es2015-modules-commonjs"],
            // presets: ['@babel/env'],
            ignore: ['./src/nodeuii/config/index.js'],
        }))
        .pipe(gulp.dest('prod'))
});
gulp.task('build-config', () => {
    return gulp.src('src/nodeuii/**/*.js')
        .pipe(plumber())
        .pipe(rollup({
            output: {
                format: 'cjs'
            },
            input: 'src/nodeuii/config/index.js',
            plugins: [
                replace({
                    "process.env.NODE_ENV": JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('lint',()=>{
    return gulp.src('src/nodeuii/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
})

let _task = ['build-dev'];
if (process.env.NODE_ENV == 'production') {
    // _task = ['build-prod'];
    _task = gulpSequence('build-prod', 'build-config')
}

if (process.env.NODE_ENV == 'lint') {
    // _task = ['build-prod'];
    _task = ['lint']
}

gulp.task('default', _task)