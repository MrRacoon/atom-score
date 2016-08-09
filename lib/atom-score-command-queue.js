'use babel'

export default class AtomScoreCommandQueue {
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
    this.queue  = this.queue.filter(e => (event.time - e.time) <= 15000)
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
