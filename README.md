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
