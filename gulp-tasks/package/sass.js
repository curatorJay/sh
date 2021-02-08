var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

module.exports = function(gulp, config) {
    return function css(done) {
        var dest = config.sass.dest;
        var src = config.sass.src;

        gulp.src(path.join(src, config.sass.entry))
            .pipe(sourcemaps.init())
            .pipe(plumber())
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(autoprefixer())
            .pipe(gulp.dest(dest));
        
        done();
    };
};
