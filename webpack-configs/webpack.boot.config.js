const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = function(config) {
    return {
        mode: 'production',
        entry: {
            boot: [
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
                                ['@babel/preset-env', { modules: false, corejs: 3, useBuiltIns: 'usage' }]
                            ],
                            plugins: [
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    }]
                }
            ],
        },
        optimization: {
            minimizer: [
                new TerserPlugin({
                    extractComments: true,
                    cache: false,
                    parallel: true,
                    sourceMap: false, // Must be set to true if using source-maps in production
                    terserOptions: {
                        extractComments: 'all',
                        compress: {
                            'pure_funcs': ['console.info', 'console.debug', 'console.log'] // remove info debug and log, keep warn and error
                        },
                        output: {
                            comments: false,
                        },
                    }
                })
            ]
        },
    };
};