var browserSync = require('browser-sync').create('server');
var ip = require('ip');

module.exports = function(gulp, config) {
    return function serve(done) {
        browserSync.emitter.on('service:running', function(data) {
            done();
        });

        browserSync.init({
            proxy: config.url,
            host: ip.address(),
            open: false,
            logLevel: 'ignore',
            notify: false,
            ghostMode: false,
            socket: {
                domain: ip.address() + ':3000'
            },
            scriptPath: function(path) {
                return '//' + ip.address() + ':3000' + path;
            }
        });
    };
};