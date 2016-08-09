'use babel'

export default class AtomScoreCommandQueue {
  constructor (init = []) {
    this.MINUTE_SIZE = 60000
    this.sampleRate = 15000
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
    this.queue  = this.queue.filter(e => (event.time - e.time) <= this.sampleRate)
    return this.queue
  }

  apm () {
    return this.queue.length * (this.MINUTE_SIZE / this.sampleRate)
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
