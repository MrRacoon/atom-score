'use babel';

export default class VimTreatsScoreboard {

  constructor(state = {}) {
    this.state = state
    this.state.score = this.state.score || 0
    this.state.apmList = this.state.apmList || []
  }

  serialize() {
    return {
      score: this.state.score
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

  addPoints(n = 1) {
    this.state.score += n
    this.apmAdd(n)
    return this.all()
  }

  // ===========================================================================

  apmAdd(n) {
    const now = new Date();
    this.state.apmList.push({
      points: n,
      time: now
    })
    return this
  }

}
