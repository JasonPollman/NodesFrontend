/**
 * The base webpack config for this application.
 * This will be used by both the prod and dev webpack configs.
 * @since 4/10/18
 * @file
 */

/* eslint-disable strict */

'use strict';

const _ = require('lodash');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    bundle: [
      'babel-polyfill',
      './src/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.css',
      '.scss',
    ],
    modules: [
      'src',
      path.join(__dirname, 'src'),
      'node_modules',
      path.join(__dirname, 'node_modules'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'handlebars-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.woff.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/font-woff',
            },
          },
        ],
      },
      {
        test: /\.ttf.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              mimetype: 'application/octet-stream',
            },
          },
        ],
      },
      {
        test: /\.eot.*$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'Node Factory',
      inject: 'body',
      template: path.join('src', 'template.hbs'),
      showErrors: true,
    }),
    new webpack.DefinePlugin(_.mapValues({
      'process.env.NODE_ENV': _.get(process.env, 'NODE_ENV', 'production'),
    }, JSON.stringify)),
  ],
};
