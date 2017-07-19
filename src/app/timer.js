import EventEmitter from 'events'
import { TimerError } from './errors'

export default class Timer extends EventEmitter {
  constructor (options = {}) {
    super()

    if (typeof options === 'number') options = { delay: options }

    this.options = Object.assign({
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

  get tick () {
    return this._tick
  }
}
