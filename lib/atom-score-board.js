'use babel';
//import { achievements } from './atom-score-achievements'
//import Notifier from './atom-score-notifier'

import AtomScoreCommandQueue from './atom-score-command-queue'
import AtomScoreHistoryMap from './atom-score-history-map'

export default class AtomScoreBoard {

  constructor(state = {}) {
    this.state = {
      latest : state.latest || {},
      history : new AtomScoreHistoryMap(state.history),
      recent  : new AtomScoreCommandQueue(state.commandQueue)
    }
  }

  serialize() {
    return {
      latest : this.latest,
      history : this.state.history.serialize(),
      recent  : this.state.recent.serialize()
    }
  }

  destroy() {
    this.state.history.destroy()
    this.state.recent.destroy()
  }

  reset () {
    this.latest = {}
    this.state.history.reset()
    this.state.recent.reset()
  }

  // ===========================================================================

  addEvent (event) {
    this.latest = event
    this.state.history.add(event)
    this.state.recent.add(event)
  }

  current () {
    return {
      latest: this.latest,
      apm: this.apm(),
      score: this.score(),
      commands: this.commands(),
      recentScore: this.recentScore(),
      counts: this.counts()
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

  counts () {
    return this.state.history.counts()
  }
}
