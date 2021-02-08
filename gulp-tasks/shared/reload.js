const browserSync = require('browser-sync').get('server');

module.exports = function() {
    return function reload(done) {
        browserSync.reload();
        done();
    };
};
