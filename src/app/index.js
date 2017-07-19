// import the babel-polyfill first. This module will override/inject prototypes to meet the ES6 Spec
import 'babel-polyfill'

import Timer from './timer'

// We don't _have_ to use `const`, but a node reference usually shouldn't be changed
const root = document.getElementById('root')

// Create an instance of a Timer
const timer = new Timer(1000)

// Subscribe to the `tick` event, and update the page
// We don't really need `window.requestAnimationFrame`, it's just a small optimization for updating the DOM
timer.on('tick', tick => window.requestAnimationFrame(() => {
  root.textContent = `Tick: ${tick}`
}))

// Start the timer
timer.start()

/*
 Normally, you would want to use something like `window.onload`, or subscribe to `DOMContentLoaded` to start executing our code,
 but since we used the `async defer` attributes when referencing our bundle, this code isn't executed until the DOM is finished parsing
 */
