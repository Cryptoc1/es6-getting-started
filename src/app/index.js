import 'babel-polyfill'
import Timer from './timer'

const root = document.getElementById('root')

const timer = new Timer(1000)

timer.on('tick', tick => window.requestAnimationFrame(() => {
  root.textContent = `Tick: ${tick}`
}))

timer.start()
