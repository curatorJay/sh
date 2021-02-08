var path = require('path');

module.exports = function(gulp, config) {
    return function assets(done) {
        gulp.src([path.join(config.assets.src, '/**/*'), '!' + config.assets.img_src, '!' + path.join(config.assets.img_src, '/**/*')], {base: config.assets.src})
            .pipe(gulp.dest(config.assets.dest));

        gulp.src([path.join(config.assets.img_src, '/**/*'), '!' + config.assets.img_src + '/tinypng-sigs'], {base: config.assets.img_src})
            .pipe(gulp.dest(config.assets.img_dest));

        done();
    };
};