const webpack = require('webpack')
const path = require('path')

const APP_DIR = path.resolve(__dirname, './src/app')
const BUILD_DIR = path.resolve(__dirname, './src/dist')

// https://webpack.js.org/concepts/configuration/
const config = {
  // Generate *.map files for the compiled JavaScript, this makes debugging easier
  devtool: 'source-map',
  // Our app starts at index.js
  entry: `${APP_DIR}/index.js`,
  module: {
    // Define loaders to handle the manipulation of the code
    loaders: [
      {
        // Tell babel to ignore files from node modules
        exclude: /node_modules/,
        // Tell babel to load files from our app directory
        include: APP_DIR,
        loader: 'babel-loader',
        options: {
          // presets tell babel what to do to our code
          // the `es2015` preset tells babel that we want to transform our ES6 -> ES5 (https://babeljs.io/docs/plugins/preset-es2015/)
          // the `stage-0` preset tells babel to insert _runtime_ code (polyfills) that change how built-in functions work to meet the ES6 spec (https://babeljs.io/docs/plugins/preset-stage-0/)
          presets: ['es2015', 'stage-0']
        },
        // Tell babel that it should transform ("load") any files that have a `.js` extension
        test: /\.js?/
      }
    ]
  },
  output: {
    // Save the compiled javascript to `bundle.min.js`
    filename: 'bundle.min.js',
    path: BUILD_DIR
  },
  plugins: [
    // enable when you don't need the source map
    // new webpack.optimize.UglifyJsPlugin()
  ],
  // Tell webpack that we are writing code for a browser
  target: 'web'
}

module.exports = config
