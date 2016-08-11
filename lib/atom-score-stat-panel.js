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

    this.commandsT = document.createElement('div')
    this.commandsT.classList.add('atom-score-panel-commands')
    this.commandsT.classList.add('inline-block')
    this.container.appendChild(this.commandsT)
    this.commands()

    this.spmT = document.createElement('div')
    this.spmT.classList.add('atom-score-panel-recent-score')
    this.spmT.classList.add('inline-block')
    this.container.appendChild(this.spmT)
    this.spm()

    this.apmContainer = document.createElement('div')
    this.apmContainer.classList.add('atom-score-panel-apm-container')
    this.apmContainer.classList.add('inline-block')

    this.apmTitle = document.createElement('div')
    this.apmTitle.classList.add('atom-score-panel-apm-title')
    this.apmTitle.classList.add('inline-block')
    this.apmValue = document.createElement('div')
    this.apmValue.classList.add('atom-score-panel-apm-value')
    this.apmValue.classList.add('inline-block')

    this.apmContainer.appendChild(this.apmTitle)
    this.apmContainer.appendChild(this.apmValue)
    this.container.appendChild(this.apmContainer)
    this.apm()

    this.scoreContainer = document.createElement('div')
    this.scoreContainer.classList.add('atom-score-panel-score-container')
    this.scoreContainer.classList.add('inline-block')

    this.scoreTitle = document.createElement('div')
    this.scoreValue = document.createElement('div')
    this.scoreChange = document.createElement('div')
    this.scoreTitle.classList.add('atom-score-panel-score-title')
    this.scoreTitle.classList.add('inline-block')
    this.scoreValue.classList.add('atom-score-panel-score-value')
    this.scoreValue.classList.add('inline-block')
    this.scoreChange.classList.add('atom-score-panel-score-change')
    this.scoreChange.classList.add('inline-block')

    this.scoreContainer.appendChild(this.scoreTitle)
    this.scoreContainer.appendChild(this.scoreValue)
    this.scoreContainer.appendChild(this.scoreChange)

    this.container.appendChild(this.scoreContainer)
    this.score()

    this.panel = atom.workspace.addTopPanel({
      item: this.container,
      visible: true,
      priority: 1
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

  score(n = 0, m = 0) {
    this.scoreTitle.textContent = 'score'
    if (m === 0) {
      this.scoreValue.textContent = n
      this.scoreChange.textContent = '+0'
    } else if (m > 0) {
      this.scoreValue.textContent = n
      this.scoreChange.textContent = `+${m}`
    } else {
      this.scoreValue.textContent = n
      this.scoreChange.textContent = m
    }
  }

  spm (n = 0) {
    this.spmT.textContent = `${n} spm`
  }

  apm(n = 0) {
    this.apmTitle.textContent = 'apm'
    this.apmValue.textContent = n
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
    this.score(scoreboard.score, scoreboard.latest.points)
    this.apm(scoreboard.apm)
    this.commands(scoreboard.commands)
    this.spm(scoreboard.spm)
  }

}
