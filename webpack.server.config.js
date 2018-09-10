require('envkey');
const path = require('path');
const webpack = require('webpack');
const EnvkeyWebpackPlugin = require('envkey-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: { server: './server/server.ts' },
  resolve: { extensions: ['.js', '.ts'] },
  target: 'node',
  mode: 'none',
  // this makes sure we include node_modules and other 3rd party libraries
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname, 'dist/server'),
    filename: '[name].js'
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
  },
  plugins: [
    new EnvkeyWebpackPlugin({
      // required, specify whitelist of vars to pull from Envkey -- you can also include "NODE_ENV" to make that available
      permitted: [
        "JWT_SECRET",
        "MONGODB_APP_NAME",
        "MONGODB_HOST",
        "MONGODB_PASSWORD",
        "MONGODB_PORT",
        "MONGODB_USERNAME",
        "NODE_ENV",
        "WWW_HOST"
      ],
      // optional, set additional vars on `process.env`
      define: {}
    }),
    // Temporary Fix for issue: https://github.com/angular/angular/issues/11580
    // for 'WARNING Critical dependency: the request of a dependency is an expression'
    new webpack.ContextReplacementPlugin(
      /(.+)?angular(\\|\/)core(.+)?/,
      path.join(__dirname, 'src'), // location of your src
      {} // a map of your routes
    ),
    new webpack.ContextReplacementPlugin(
      /(.+)?express(\\|\/)(.+)?/,
      path.join(__dirname, 'src'),
      {}
    ),
  ]
};
