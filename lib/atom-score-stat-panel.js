'use babel';

export default class AtomScoreStatPanel {
  constructor (state = {}) {

    this.container = document.createElement('div')
    this.container.classList.add('atom-score-panel')

    this.title = document.createElement('div')
    this.title.textContent = 'Atom Score'
    this.title.classList.add('atom-score-panel-title')
    this.title.classList.add('inline-block')
    this.container.appendChild(this.title)

    this.scoreT = document.createElement('div')
    this.scoreT.classList.add('atom-score-panel-score')
    this.scoreT.classList.add('inline-block')
    this.container.appendChild(this.scoreT)
    this.score()

    this.apmT = document.createElement('div')
    this.apmT.classList.add('atom-score-panel-apm')
    this.apmT.classList.add('inline-block')
    this.container.appendChild(this.apmT)
    this.apm()

    this.spmT = document.createElement('div')
    this.spmT.classList.add('atom-score-panel-recent-score')
    this.spmT.classList.add('inline-block')
    this.container.appendChild(this.spmT)
    this.spm()

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
    this.scoreT.textContent = `${n} pts`
  }

  spm (n = 0) {
    this.spmT.textContent = `${n} spm`
  }

  apm(n = 0) {
    this.apmT.textContent = `${n} apm`
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
    this.spm(scoreboard.spm)
  }

}
