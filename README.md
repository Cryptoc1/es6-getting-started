# Getting Started with ES6

This repo is aimed at providing a simple tutorial to help those start using ES6 with webpack/babel WITHOUT React or Angular. A misconception I sometimes feel when reading, or following other tutorials is that the authors assume that the developer's instentions in using webpack/babel/ES6 is to do React or Angular development. This is, however, inaccurate. Although webpack/babel are powerful tools that make React/Angular development easier, they are still framework agnositic, making it easy to write dependable, vanilla, ES6 JavaScript.

## Assumptions 

This tutorial assumes the following:
+ You are using a Unix/bash-like command line
+ You already have `node`/`npm` installed globally
+ Minimal experience with `gulp`

## Configuring the Envirnoment

The intention of this tutorial is to use the repo as a reference as you create your own project to duplicate the code within this repo. With that in mind, let's get started!

  _Note_: You'll need to run `npm install` in this repo if you wish to work side-by-side, as the repo does not include any `node_modules`

Start by creating your project workspace.

  `$ mkdir es6-getting-started; cd es6-getting-started`

Now, let's initialize our workspace with `npm`.

  `$ npm init`

Next is to start defining our workspace structure. Our tree should look like the following:

  ```
  .
  +-- src/
  |   +-- app/          # JavaScript sources will live here
  |   +-- assets/       # StyleSheets, fonts, and images live in here
  |   +-- dist/         # Our compiled JavaScript source, and StyleSheets will live here
  +-- package.json
  +-- README.md
  ```

### Configuring `webpack`

To start, create the file `webpack.config.js` in the workspace root.

  `$ touch webpack.config.js`

Before defining our configuration, we need to install the dependencies required to get webpack working.

  `$ npm install --save-dev webpack babel-cli babel-loader babel-preset-es2015 babel-preset-stage-0 babel-polyfill`

  _Hint_: You can use `-D` instead `--save-dev`
  _Hint_: You can use `i` instead `install`

The webpack configuration is a node module that webpack will import when it runs. This makes webpack plugins, and loaders can easily be managed using `npm`. As such, we define our configuration as a simple object, that gets exported.

  ```javascript
    const APP_DIR = './src/app'
    const BUILD_DIR = './src/dist'

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
        // Save to ./app/dist
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

    // Export the configuration
    module.exports = config
  ```

### Configuring `gulp`

This project uses gulp to compile SASS to a minified StyleSheet.

Begin by installing depenedencies:

  `$ npm i -D gulp gulp-concat gulp-minify-css gulp-sass del`

  _Hint_: You can configure gulp to run your webpack build also, using [`gulp-stream`](https://github.com/shama/webpack-stream)

Next, create `gulpfile.js` in the root of the workspace.

  `$ touch gulpfile.js`

 Since this project only uses `gulp` to compile StyleSheets, the gulpfile is quite minimal.

  ```javascript
    const concat = require('gulp-concat')
    const del = require('del')
    const gulp = require('gulp')
    const minifyCSS = require('gulp-minify-css')
    const sass = require('gulp-sass')

    const config = {
      // Our stylesheet sources exist in the `./assets` folder
      css: [
        // include SASS files
        'src/assets/**/*.scss',
        // Also include CSS files
        'src/assets/**/*.css'
      ]
    }
    
    // Define output for compiled StyleSheets
    config.css.output = 'src/dist'

    // This task deletes existing compiled stylesheets
    gulp.task('clean-css', () => del(['src/app/dist/**/*.min.css']))

    // This task compiles and minifies our StyleSheets
    gulp.task('css', ['clean-css'], () => {
      return gulp.src(config.css)
        // Compile SASS source
        .pipe(sass().on('error', sass.logError))
        // Concat compiled sources into a single StyleSheet
        .pipe(concat('styles.min.css'))
        // Minify the final StyleSheet
        .pipe(minifyCSS())
        // Write to the desired destination
        .pipe(gulp.dest(config.css.output))
    })

    // This task watches for changes to StyleSheets, and runs `css`
    gulp.task('watch-css', ['css'], () => gulp.watch(config.css, ['css']))
  ```

### Configuring `npm` as a Task Runner

If you've used Visual Studio before, you may have used the Task Runner to manage your gulp tasks before. For this project, we use `npm` to run tasks. The advantage of using `npm` is that you can send arguments to the script being run. All the tasks we define will execute node scripts from packages we installed previously (`gulp`, and `webpack`). Although the scripts we run can be installed globally for these tools, we prefer to reference the scripts directly from `node_modules/`, becuase it makes the task running independent of the developer having node properly configured globally.

For example, `gulp` can be installed globally using `npm install -g gulp`, and our gulp task could look like:

  ```javascript
    "scripts": {
      "gulp": "gulp",
      "watch-css": "gulp watch-css"
    }
  ```

However, in some enviroments (i.e.: Windows), `node` may not be properly configured, causing `$ gulp watch-css` to not run.

More info about ensuring node packages can be run globally can be found, [here](https://stackoverflow.com/a/5926706). 

Open `package.json` and the `scripts` section (if the section doesn't exist, you can create it).

The first task we define we allow us to run gulp from the `node_modules/` folder (locally).

  ```javascript
    "scripts": {
      "gulp": "node node_modules/gulp/bin/gulp.js"
    }
  ```

You can now run this task using `npm`:

  `$ npm run gulp [<GULP_ARGS>]`

Or, with arguments:

  `$ npm run gulp clean-css`

The next task we'll define will run the `watch-css` task from our gulp configuration.

  ```javascript
    "scripts": {
      "gulp": "node node_modules/gulp/bin/gulp.js",
      "watch-css": "npm run gulp watch-css"
    }
  ```

As you can see, this task just runs our `gulp` task, with an argument for `gulp` to run the `watch-css` task.

Finally, we'll define tasks for `webpack`. One task that will compile our JavaScript sources, and another to watch, and compile our JavaScript sources.

  ```javascript
    "scripts": {
      "gulp": "node node_modules/gulp/bin/gulp.js",
      "watch-css": "npm run gulp watch-css",
      "webpack": "node node_modules/webpack/bin/webpack.js --colors --progress",
      "webpack-watch": "node node_modules/webpack/bin/webpack.js --colors --progress --watch"
    }
  ```

Now the workspace structure is defined, webpack and gulp are configured, and the dependencies installed, we're ready to start writing some ES6 JavaScript.

## The Code
