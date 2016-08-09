'use babel';

//import { achievements } from './atom-score-achievements'
//import Notifier from './atom-score-notifier'

export default class AtomScoreBoard {

  constructor(state = {}) {
    this.state = {
      history : new HistoryMap(state.history),
      recent  : new CommandQueue(state.commandQueue)
    }
  }

  serialize() {
    return {
      history : this.state.history.serialize(),
      recent  : this.state.recent.serialize()
    }
  }

  destroy() {
    this.state.history.destroy()
    this.state.recent.destroy()
  }

  // ===========================================================================

  addEvent (event) {
    this.state.history.add(event)
    this.state.recent.add(event)
  }

  current () {
    return {
      apm: this.apm(),
      score: this.score(),
      commandString: this.commandString()
    }
  }

  score () {
    return this.state.history.score()
  }

  apm () {
    return this.state.recent.apm()
  }

  commandString () {
    return this.state.recent.commandString()
  }

}

class CommandQueue {
  constructor (init = []) {
    this.queue = init
  }

  serialize () {
    return this.queue
  }

  destroy () { }

  add (event) {
    this.queue.unshift(event)
    this.queue  = this.queue
      .filter(e => (event.time - e.time) <= 6000)
    return this.queue
  }

  apm () {
    return this.queue.length
  }

  commandString () {
    return this.queue
      .map(e => e.key)
      .join('')
  }

  update() {

  }
}

class HistoryMap {
  constructor (init = {}) {
    this.hist = init
  }

  serialize() {
    return this.hist
  }

  destroy() { }

  add (event) {
    const was    = this.hist[event.command] || {}
    const willBe = {
      count : (was.count  || 0) + 1,
      points: (was.points || 0) + event.points
    }
    this.hist[event.command] = willBe;
  }

  score () {
    var total = 0
    for (h in this.hist) {
      total += (this.hist[h].points || 0)
    }
    return total
  }
}
