/**
 * The production webpack config for this application.
 * @since 4/10/18
 * @file
 */

/* eslint-disable strict, import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const mergeWebpackConfig = require('webpack-merge');

const UglifyJsPlugin = require('clean-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const common = require('./webpack.config');

const extractSass = new ExtractTextPlugin({
  filename: '[name]-[chunkhash].css',
  allChunks: true,
});

module.exports = mergeWebpackConfig(common, {
  devtool: 'source-map',
  module: {
    rules: extractSass.extract({
      fallback: 'style-loader',
      use: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
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
        },
      ],
    }),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    compress: true,
    hot: true,
    open: false,
    port: 1337,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  plugins: [
    extractSass,
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
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
