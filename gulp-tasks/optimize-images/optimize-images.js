var path = require('path');
var tinypng = require('gulp-tinypng-compress');

module.exports = function(gulp, config) {
    return function optimizeImages(done) {
        gulp.src([path.join(config.images.src, '/**/*.{png,jpg,jpeg}'), '!' + path.join(config.assets.src, '/img/.optimized'), '!' + path.join(config.assets.src, '/img/.optimized/**/*')])
            .pipe(tinypng({
                key: 'OUfZVoqF4TgxY9yFmg22s4r3sYj5ubME',
                sigFile: path.join(config.images.src, '.optimized/tinypng-sigs'),
                log: true
            }))
            .pipe(gulp.dest(config.images.dest));
        
        done();
    };
};
