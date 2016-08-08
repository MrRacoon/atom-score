'use babel';

import { achievements } from './atom-score-achievements'

export default class AtomScoreBoard {

  constructor(state = {}) {
    this.state = state
    this.state.history = this.state.history || {}
    this.state.score   = this.state.score   || 0
    this.state.apmList = this.state.apmList || []
    this.state.commandString = []
  }

  serialize() {
    return this.all()
  }

  destroy() { }

  // ===========================================================================

  all() {
    return {
      score: this.score(),
      apm: this.apm(),
      history: this.history(),
      commandString: this.commandString()
    }
  }

  history() {
    return this.state.history
  }

  score () {
    return this.state.score
  }

  apm () {
    const now = new Date()
    const APM_BUFFER_TIME = 15000
    this.state.apmList = this.state.apmList.filter(score => now - score.time <= APM_BUFFER_TIME)
    return this.state.apmList.length * 2
  }

  commandString() {
    return this.state.commandString
  }

  reset() {
    this.state.score = 0
    this.state.apmList = []
    this.state.commandString = []
  }

  // ===========================================================================

  addEntry(entry) {
    const count = this.state.history[entry.command] || 0
    const COMMAND_STRING_LENGTH = 20
    this.state.commandString.unshift(entry.key)
    this.state.commandString = this.state.commandString.slice(0, COMMAND_STRING_LENGTH+1)
    this.state.score += entry.points
    this.state.apmList.push(entry)
    this.state.history[entry.command] = count + 1
    return this.all()
  }

}
