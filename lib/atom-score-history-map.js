'use babel';

export default class AtomScoreHistoryMap {
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

  counts () {
    var ret = {}
    for (h in this.hist) {
      ret[h] = this.hist[h].count
    }
    return ret
  }
}
