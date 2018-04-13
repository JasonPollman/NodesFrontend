/**
 * The development webpack config for this application.
 * @since 4/10/18
 * @file
 */

/* eslint-disable strict, import/no-extraneous-dependencies */

'use strict';

const path = require('path');
const webpack = require('webpack');
const mergeWebpackConfig = require('webpack-merge');
const common = require('./webpack.config');

common.entry.dist.unshift('react-hot-loader/patch');

module.exports = mergeWebpackConfig(common, {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
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
    new webpack.NamedModulesPlugin(),
  ],
});
