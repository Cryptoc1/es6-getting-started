const webpack = require('webpack')
const path = require('path')

const APP_DIR = path.resolve(__dirname, './src/app')
const BUILD_DIR = path.resolve(__dirname, './src/dist')

const config = {
  devtool: 'source-map',
  entry: `${APP_DIR}/index.js`,
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        include: APP_DIR,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'stage-0']
        },
        test: /\.js?/
      }
    ]
  },
  output: {
    filename: 'bundle.min.js',
    path: BUILD_DIR
  },
  // enable when you don't need the source map
  // plugins: [ new webpack.optimize.UglifyJsPlugin() ],
  target: 'web'
}

module.exports = config
