const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('tsconfig.json') }
          },
          'angular2-template-loader',
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(ttf|woff)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[hash].[ext]',
        },
      },
      {
        test: /\.pcss$/,
        exclude: helpers.root('src', 'node_modules'),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options : { autoprefixer: false, sourceMap: true, importLoaders: 1 }
            },
            'postcss-loader',
          ]
        })
      },
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills'],
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
  ]
};
