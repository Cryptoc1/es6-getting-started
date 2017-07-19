/*
  This is some naming trickery! Why `./errors/index.js`?!
  Well,,,
  The `./errors/index.js` structure creates an interesting why of "namespacing" imports. In a way, it defines the `./errors` folder as a module
  For example, a user could use and import statement like:
    import TimerError from './errors/timer'
  But by using this `./errors/index.js` pattern, a user could import classes from the errors module as such:
    import { TimerError } from './errors'
*/

import TimerError from './timer'

// export as a named export
export { TimerError }
