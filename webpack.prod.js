/**
 * The production webpack config for this application.
 * @since 4/10/18
 * @file
 */

/* eslint-disable strict, import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const mergeWebpackConfig = require('webpack-merge');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.config');

module.exports = mergeWebpackConfig(common, {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: {
          warnings: false,
        },
      },
    }),
  ],
});
