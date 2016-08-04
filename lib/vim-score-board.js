'use babel';

export default class VimScoreBoard {

  constructor(state = {}) {
    this.state = state
    this.state.commands = this.state.commands || {}
    this.state.score = this.state.score || 0
    this.state.apmList = this.state.apmList || []
  }

  serialize() {
    return {
      score: this.state.score,
      apmList: this.state.apmList,
      commands: this.state.commands
    }
  }

  destroy() { }

  // ===========================================================================

  all() {
    return {
      score: this.score(),
      apm: this.apm()
    }
  }

  score () {
    return this.state.score
  }

  apm () {
    const now = new Date()
    const fifteenSeconds = 15000
    this.state.apmList = this.state.apmList.filter(score => now - score.time <= fifteenSeconds)
    return this.state.apmList.length * 4
  }

  reset() {
    this.state.score = 0
  }

  // ===========================================================================

  addEntry(entry) {
    const count = this.state.commands[entry.command] || 0
    this.state.commands[entry.command] = count + 1
    this.state.score += entry.points
    this.state.apmList.push(entry)
    return this.all()
  }

}
