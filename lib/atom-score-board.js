'use babel';
//import { achievements } from './atom-score-achievements'
//import Notifier from './atom-score-notifier'

import AtomScoreCommandQueue from './atom-score-command-queue'
import AtomScoreHistoryMap from './atom-score-history-map'

export default class AtomScoreBoard {

  constructor(state = {}) {
    this.state = {
      latest : state.latest || {},
      streak : state.streak || 0,
      history : new AtomScoreHistoryMap(state.history),
      recent  : new AtomScoreCommandQueue(state.commandQueue)
    }
  }

  serialize() {
    return {
      latest  : this.state.latest,
      streak  : this.state.streak,
      history : this.state.history.serialize(),
      recent  : this.state.recent.serialize()
    }
  }

  destroy() {
    this.state.history.destroy()
    this.state.recent.destroy()
  }

  reset () {
    this.state.latest = {}
    this.state.streak = 0
    this.state.history.reset()
    this.state.recent.reset()
  }

  // ===========================================================================

  addEvent (event) {
    this.state.latest = event
    this.state.history.add(event)
    this.state.recent.add(event)

    if (this.state.streak > 0 && event.points > 0) {
      this.state.streak += event.points
    } else if (this.state.streak < 0 && event.points < 0) {
      this.state.streak += event.points
    } else if (event.points !== 0) {
      this.state.streak = event.points
    }
  }

  current () {
    return {
      latest: this.latest(),
      streak: this.streak(),
      apm: this.apm(),
      score: this.score(),
      commands: this.commands(),
      spm: this.spm(),
      counts: this.counts()
    }
  }

  score () {
    return this.state.history.score()
  }

  apm () {
    return this.state.recent.apm()
  }

  spm () {
    return this.state.recent.score()
  }

  commands () {
    return this.state.recent.commands()
  }

  counts () {
    return this.state.history.counts()
  }

  latest () {
    return this.state.latest
  }

  history () {
    return this.state.history.serialize()
  }

  streak () {
    return this.state.streak
  }

}
