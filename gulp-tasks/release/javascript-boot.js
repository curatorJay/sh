const webpack = require('webpack');

module.exports = function(gulp, config) {
    return function javascriptBoot(done) {
        const webpackConfig = require('../../webpack-configs/webpack.boot.config.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new Error('webpack error', error);
            const statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log('[webpack]', statsErrors);
            done();
        });
    };
};