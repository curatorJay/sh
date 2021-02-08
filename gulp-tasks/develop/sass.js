var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').get('server');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, config) {
    return function css(done) {
        var dest = config.sass.dest;
        var src = config.sass.src;

        gulp.src(path.join(src, config.sass.entry), { base: src })
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass())
            .pipe(sourcemaps.write())
            .pipe(autoprefixer())
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream());
        done();
    };
};
