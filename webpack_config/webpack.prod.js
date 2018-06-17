const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const uglifyjs = require('uglifyjs-webpack-plugin')

module.exports = merge(common.webpackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': false,
        }),
        new uglifyjs({
            parallel: true,
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false,
                },
                compress: {
                    drop_console: true,
                    dead_code: true,
                    warnings: true,
                },
                warnings: false
            }
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
});