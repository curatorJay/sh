const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const path = require('path');
const webpack = require('webpack');
const browserSync = require('browser-sync').get('server');

module.exports = function(config) {
    return {
        mode: 'development',
        watch: true,
        entry: {
            boot: [
                path.join(config.js.src, 'browsersync.js'),
                path.join(config.js.src, 'boot.js')
            ]
        },
        output: {
            path: path.resolve(config.js.dest),
            filename: '[name].bundle.js'
        },
        resolve: {
            alias: config.js.alias,
            modules: [
                path.resolve(config.js.src),
                'node_modules'
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    use: [{
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [
                                ['@babel/preset-env', { modules: false, corejs: 3, debug: false, useBuiltIns: 'usage' }]
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }]
                }
            ]
        },
        plugins: [
            // new BundleAnalyzerPlugin(),
            new webpack.DefinePlugin({
                __BROWSERSYNC_SCRIPT__: browserSync.getOption('snippet').replace(/[\s\S]+(document\.write.+;)[\s\S]+/g, '$1'),
                __BROWSERSYNC_URL__: JSON.stringify(browserSync.getOption('urls').get('external'))
            })
        ]
    };
};