'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');
var plumber = require('gulp-plumber');
var del = require('del');
var st = require('st');
var fs = require('fs');
var opn = require('opn');

var concat = require('gulp-concat');
var header = require('gulp-header');
var replace = require('gulp-replace');
var newer = require('gulp-newer');

var jsdoc2md = require('gulp-jsdoc-to-markdown');

var http = require('http');

var paths = {
    scripts: [
        'src/js/utils/MathUtil.js',
        'src/js/utils/TextureUtil.js',
        'src/js/core/Dom.js',
        'src/js/core/Gui.js',
        'src/js/core/Events.js',

        'src/js/nodes/BaseNode.js',
        'src/js/nodes/CircleNode.js',
        'src/js/nodes/LineNode.js',
        'src/js/nodes/RectNode.js',
        'src/js/nodes/SpriteNode.js',
        'src/js/nodes/TextNode.js',

        'src/js/managers/DeviceManager.js',
        'src/js/managers/ErrorManager.js',
        'src/js/managers/FpsManager.js',
        'src/js/managers/ResourceManager.js',
        'src/js/managers/StorageManager.js',
        'src/js/managers/TimeManager.js',
        'src/js/managers/TriggerManager.js',
        'src/js/managers/ViewManager.js',

        'src/js/io/AudioHandler.js',
        'src/js/io/InputHandler.js',

        'src/js/core/Layers.js',
        'src/js/core/Scene.js',

        'src/js/j2Ds.js'
    ],
    example: [
        'tests/2dist/index.html',
        'tests/2dist/application.js',
        'tests/2dist/style.css'
    ]
};

var server = {
    port: '8000'
};


/** Clean **/
gulp.task('clean', function () {
    return del(['dist']);
});

/** Developer example **/
gulp.task('example-dist', [], function () {
    gulp.src(paths.example)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(newer('dist'))
        .pipe(gulp.dest('dist'))
        .pipe(livereload());
});

gulp.task('js-scripts', [], function () {
    gulp.src(paths.scripts)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('j2ds.js'))
        .pipe(uglify())
        .pipe(header(fs.readFileSync('src/header.js', 'utf8')))
        .pipe(sourcemaps.write('./'))
        .pipe(rename(function (path) {
            if (path.basename.substr(path.basename.length - 4) !== '.min' && path.extname === '.js') {
                path.basename += '.min';
            }
            if (path.basename.substr(path.basename.length - 3) === '.js' && path.extname === '.map') {
                path.basename = path.basename.slice(0, path.basename.length - 3) + '.min';
            }
        }))
        .pipe(replace('.js.map', '.min.map'))
        .pipe(gulp.dest('dist/js'));
});

/** Docs */
gulp.task('docs', function () {
    return gulp.src(paths.scripts)
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('api.all.md'))
        .pipe(jsdoc2md({
            'sort-by': 'name',
            encoding: "utf8",
            recurse: true,
            private: true,
            lenient: true,
            template: fs.readFileSync('./jsdoc.hbs', 'utf8')}))
        .pipe(rename(function (path) {
            path.extname = '.md'
        }))
        .pipe(gulp.dest('docs/api'))
});

/** Watcher **/
gulp.task('watch', ['default', 'server'], function () {
    livereload.listen({basePath: 'dist'});
    gulp.watch(paths.scripts, ['js-scripts']);
    gulp.watch(paths.example, ['example-dist']);
});

/** Server for watcher **/
gulp.task('server', function (done) {
    http.createServer(
        st({path: __dirname + '/dist', index: 'index.html', cache: false})
    ).listen(server.port, done);
    console.log('Listening on port ' + server.port);
});

/** Open browser **/
gulp.task('browser-chrome', function () {
    opn('http://127.0.0.1:' + server.port, {app: 'chrome'});
});

gulp.task('browser-firefox', function () {
    opn('http://127.0.0.1:' + server.port, {app: 'firefox'});
});

/** Make **/
gulp.task('make', ['clean'], function () {
    gulp.start('js-scripts');
    gulp.start('example-dist');
});

/** Default **/
gulp.task('default', ['make']);
