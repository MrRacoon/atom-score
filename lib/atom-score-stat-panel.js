'use babel';

export default class AtomScoreStatPanel {
  constructor (state = {}) {

    this.container = document.createElement('div')
    this.container.classList.add('atom-score-panel')

    this.divider = document.createElement('div')
    this.divider.textContent = '|'
    this.divider.classList.add('atom-score-panel-divider')
    this.divider.classList.add('inline-block')

    this.title = document.createElement('div')
    this.title.textContent = 'Atom Score'
    this.title.classList.add('atom-score-panel-title')
    this.title.classList.add('inline-block')
    this.container.appendChild(this.title)
    this.container.appendChild(this.divider.cloneNode(true))

    this.scoreT = document.createElement('div')
    this.scoreT.classList.add('atom-score-panel-score')
    this.scoreT.classList.add('inline-block')
    this.container.appendChild(this.scoreT)
    this.container.appendChild(this.divider.cloneNode(true))
    this.score()

    this.apmT = document.createElement('div')
    this.apmT.classList.add('atom-score-panel-apm')
    this.apmT.classList.add('inline-block')
    this.container.appendChild(this.apmT)
    this.container.appendChild(this.divider.cloneNode(true))
    this.apm()

    this.recentScoreT = document.createElement('div')
    this.recentScoreT.classList.add('atom-score-panel-recent-score')
    this.recentScoreT.classList.add('inline-block')
    this.container.appendChild(this.recentScoreT)
    this.container.appendChild(this.divider.cloneNode(true))
    this.recentScore()

    this.commandsT = document.createElement('div')
    this.commandsT.classList.add('atom-score-panel-commands')
    //this.commandsT.classList.add('inline-block')
    this.container.appendChild(this.commandsT)
    this.commands()

    this.panel = atom.workspace.addTopPanel({
      item: this.container,
      visible: true,
      priority: 10
    })
  }

  serialize () {
    return { }
  }

  destroy () {
    this.panel.remove()
  }

  hide () {
    return this.panel.hide()
  }

  show () {
    return this.panel.show()
  }

  score(n = 0) {
    this.scoreT.textContent = `Score : ${n}`
  }

  recentScore (n = 0) {
    this.recentScoreT.textContent = `Recent : ${n}`
  }

  apm(n = 0) {
    this.apmT.textContent = `APM : ${n}`
  }

  commands(n = []) {
    this.old = this.old || []
    if (n.length > this.old.length) {
      this.commandsT.classList.add('increasing')
      this.commandsT.classList.remove('decreasing')
    } else if (n.length < this.old.length) {
      this.commandsT.classList.remove('increasing')
      this.commandsT.classList.add('decreasing')
    } else {
      this.commandsT.classList.remove('increasing')
      this.commandsT.classList.remove('decreasing')
    }
    this.old = n
    this.commandsT.textContent = n.join('')
  }

  setScore(scoreboard) {
    this.score(scoreboard.score)
    this.apm(scoreboard.apm)
    this.commands(scoreboard.commands)
    this.recentScore(scoreboard.recentScore)
  }

}
