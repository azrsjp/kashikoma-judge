const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common.webpackConfig, {
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'DEBUG': true,
        }),
    ],
    devServer: {
        contentBase: path.resolve(common.basePath, 'dist'),
        port: 8080,
        inline: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: true,
            ignored: /node_modules/
        },
    },
});