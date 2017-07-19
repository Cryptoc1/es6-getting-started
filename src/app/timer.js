// import existing modules that we'll use

// events is a built-in node module. When webpack compiles this source, it will inject (pack) the EventEmitter module, so that we don't have to.
import EventEmitter from 'events'
// We use `{}` because in `./errors/index.js` we defined TimeError as a named export
import { TimerError } from './errors'

/**
 * A timer ticks
 *
 * @class Timer
 * @extends {EventEmitter}
 */
class Timer extends EventEmitter {
  constructor (options = {}) {
    super()

    if (typeof options === 'number') options = { delay: options }

    // Object.assign() is an ES6 feature. We don't have to worry about browser support because `babel-polyfill` (in index.js) will define this method if the browser didn't
    this.options = Object.assign({
      autoStart: false,
      delay: 1000
    }, options)

    this.paused = false
    this.started = false
    this.stopped = false
    this._tick = 0
    this.timeout = null

    if (this.options.autoStart === true) this.start()
  }

  pause () {
    window.clearTimeout(this.timeout)
    this.timeout = null

    this.emit('paused', this.paused = true)
  }

  resume () {
    if (this.stopped === true) throw new TimerError('Timer has been stopped')

    if (!this.started) return this.start()
    this.setTick()
    this.emit('resumed', this.paused = false)
  }

  setTick () {
    this.timeout = window.setTimeout(() => {
      this.emit('tick', ++this._tick)

      this.setTick()
    }, this.options.delay)
  }

  start () {
    if (this.stopped === true) throw new TimerError('Timer has been stopped')

    this.startedAt = Date.now()
    this.setTick()
    this.emit('started', this.started = true)
  }

  stop () {
    window.clearTimeout(this.timeout)
    this.timeout = null
    this._tick = 0

    this.emit('stopped', this.stopped = true)
  }

  // We use the `get` keyword to define a readonly property. This prevents users of the Timer module from editing the value of `.tick`
  get tick () {
    return this._tick
  }
}

/*
 Export the Timer class
 We use the `default` keyword so that we don't need to use a named import

 If this were a named export it would look like:
  export { Timer }
 Importing this module would then look like:
  import { Timer } from './timer'

 By NOT using a named export, users of this module can import Timer however they want.
 e.g.:
  import T from './timer
 In this example, `T` is equivalent to the `Timer` class

*/
export default Timer
