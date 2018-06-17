const path = require('path');
const webpack = require("webpack");
const cleanWebpackPlugin = require('clean-webpack-plugin');

const basePath = __dirname + "/..";
exports.basePath = basePath;

exports.webpackConfig = {
    entry: {
        main: path.resolve(basePath, "src/main.ts"),
    },
    output: {
        path: path.resolve(basePath, "dist/js"),
        filename: "[name].js",
        publicPath: "/js/",
    },
    resolve: {
        extensions: [".ts", ".js"],
        modules: [
            path.resolve(basePath, "src"),
            path.resolve(basePath, "node_modules")
        ],
        alias: {
            pixi: path.resolve(basePath, 'src/CustomizedDeps/pixi-custom.js'),
            p2: path.resolve(basePath, 'src/CustomizedDeps/p2-custom.js'),
            phaser: path.resolve(basePath, 'src/CustomizedDeps/phaser-custom.js'),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            },
            {
                test: /\.ts$/,
                loader: "awesome-typescript-loader",
                exclude: [/node_modules/],
            },
            {
                test: /pixi-custom\.js$/,
                loader: 'expose-loader?PIXI'
            },
            {
                test: /p2-custom\.js$/,
                loader: 'expose-loader?p2'
            },
            {
                test: /phaser-custom\.js$/,
                loader: 'expose-loader?Phaser'
            }
        ]
    },
    plugins: [
        new cleanWebpackPlugin(['./dist/js/']),
    ],
};
