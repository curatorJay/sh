var path = require('path');

module.exports = function(gulp, config) {
    return function fonts(done) {
        var src = config.fonts.src;
        var dest = config.fonts.dest;

        gulp.src(path.join(src, '/**/*'), {base: src})
            .pipe(gulp.dest(dest));

        done();
    };
};
