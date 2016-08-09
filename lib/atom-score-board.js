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

  reset () {
    this.state.history.reset()
    this.state.recent.reset()
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
      commands: this.commands(),
      recentScore: this.recentScore()
    }
  }

  score () {
    return this.state.history.score()
  }

  apm () {
    return this.state.recent.apm()
  }

  recentScore () {
    return this.state.recent.score()
  }

  commands () {
    return this.state.recent.commands()
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

  reset () {
    this.queue = []
  }

  add (event) {
    this.queue.unshift(event)
    this.queue  = this.queue
      .filter(e => (event.time - e.time) <= 15000)
    return this.queue
  }

  apm () {
    return this.queue.length * 4
  }

  commands () {
    return this.queue.map(e => e.key)
  }

  score() {
    return this.queue
      .map(e => e.points)
      .reduce((tot, nex) => tot + nex, 0)
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

  reset () {
    this.hist = {}
  }

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
