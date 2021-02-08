const webpack = require('webpack');
const logSymbols = require('log-symbols');

module.exports = function(gulp, config) {
    return function javascriptBoot(done) {
        const webpackConfig = require('../../webpack-configs/webpack.boot.config.dev.js')(config);
        webpack(webpackConfig, function(error, stats) {
            if (error) throw new Error('webpack error', error);
            const statsErrors = stats.toString('errors-only');
            if (statsErrors) console.log(logSymbols.error, statsErrors);
            console.log(`webpack build time: ${stats.endTime - stats.startTime}ms (boot)`);
            done();
        });
    };
};