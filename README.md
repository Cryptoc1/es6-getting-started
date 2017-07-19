# Getting Started with ES6

This repo is aimed at providing a simple tutorial to help those start using ES6 with webpack/babel WITHOUT React or Angular. A misconception I sometimes feel when reading, or following other tutorials is that the authors assume that the developer's instentions in using webpack/babel/ES6 is to do React or Angular development. This is, however, inaccurate. Although webpack/babel are powerful tools that make React/Angular development easier, they are still framework agnositic, making it easy to write dependable, vanilla, ES6 JavaScript.

## Assumptions 

This tutorial assumes the following:
+ You are using a Unix/bash-like command line
+ You already have `node`/`npm` installed globally

## Setting up your Enviroment

The intention of this tutorial is to use the repo as a reference as you create your own project to duplicate the code within this repo. With that in mind, let's get started!

Start by creating your project workspace.

  `$ mkdir es6-getting-started; cd es6-getting-started`

Now, let's initialize our workspace with `npm`.

  `$ npm init`

Next is to start defining our workspace structure. Our tree should look like the following:

  ```
  .
  +-- src/
  |   +-- app/
  |   +-- assets/
  |   +-- dist/
  +-- package.json
  +-- README.md
  ```

### Configuring `webpack`

To start, create the file `webpack.config.js` in the workspace root.

  `$ touch webpack.config.js`

Before defining our configuration, we need to install the dependencies required to get webpack working.

  `$ npm install --save-dev webpack babel-cli babel-loader babel-preset-es2015 babel-preset-stage-0 babel-polyfill`

  _Hint_: You can use `-D` instead `--save-dev`

  ```javascript
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
            // Tell babel to ignore files imported from node modules
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
        // Minify + mangle the compiled code
        // enabling this plugin we prevent webpack from generating your source-maps, so it's disabled for development
        // new webpack.optimize.UglifyJsPlugin()
      ],
      // Tell webpack that we are writing code for a browser
      target: 'web'
    }
  ```


