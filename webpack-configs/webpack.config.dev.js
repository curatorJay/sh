const path = require('path');

module.exports = function(config) {
    return {
        mode: 'development',
        watch: true,
        entry: {
            main: path.join(config.js.src, config.js.entry)
        },
        output: {
            path: path.resolve(config.js.dest),
            filename: config.js.output,
            chunkFilename: '[id].bundle.js',
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
                    test: /backbone\.js$/,
                    loader: 'imports-loader?define=>false'
                },
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|vendor)/,
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
                },
                {
                    test: /\.glsl$/,
                    use: 'webpack-glsl-loader'
                }
            ],
        },
        optimization: {
            namedChunks: true,
            splitChunks: {
                name: false,
                cacheGroups: {
                    vendors: {
                        test: /(node_modules|vendor)/,
                        name: 'vendor',
                        chunks: 'all'
                    }
                }
            }
        }
    };
};
