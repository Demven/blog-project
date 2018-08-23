const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  devtool: 'source-map',

  output: {
    path: helpers.root('dist/client'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    })
  ],

  optimization: {
    noEmitOnErrors: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
      })
    ]
  },
});
