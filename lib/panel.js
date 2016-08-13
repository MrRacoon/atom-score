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

    this.spmContainer = document.createElement('div')
    this.spmContainer.classList.add('atom-score-panel-spm-container')
    this.spmContainer.classList.add('inline-block')

    this.spmTitle = document.createElement('div')
    this.spmTitle.classList.add('atom-score-panel-spm-title')
    this.spmTitle.classList.add('inline-block')
    this.spmValue = document.createElement('div')
    this.spmValue.classList.add('atom-score-panel-spm-value')
    this.spmValue.classList.add('inline-block')

    this.spmContainer.appendChild(this.spmTitle)
    this.spmContainer.appendChild(this.spmValue)
    this.container.appendChild(this.spmContainer)
    this.spm()

    // =========================================================================

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

    // =========================================================================

    this.streakContainer = document.createElement('div')
    this.streakContainer.classList.add('atom-score-panel-streak-container')
    this.streakContainer.classList.add('inline-block')

    this.streakTitle = document.createElement('div')
    this.streakTitle.classList.add('atom-score-panel-streak-title')
    this.streakTitle.classList.add('inline-block')

    this.streakValue = document.createElement('div')
    this.streakValue.classList.add('atom-score-panel-streak-value')
    this.streakValue.classList.add('inline-block')

    this.streakContainer.appendChild(this.streakTitle)
    this.streakContainer.appendChild(this.streakValue)
    this.container.appendChild(this.streakContainer)
    this.streak()

    // =========================================================================

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
      this.scoreValue.classList.remove('increasing')
      this.scoreValue.classList.remove('decreasing')
      this.scoreChange.textContent = '+0'
      this.scoreChange.classList.remove('increasing')
      this.scoreChange.classList.remove('decreasing')
    } else if (m > 0) {
      this.scoreValue.textContent = n
      this.scoreValue.classList.add('increasing')
      this.scoreValue.classList.remove('decreasing')
      this.scoreChange.textContent = `+${m}`
      this.scoreChange.classList.add('increasing')
      this.scoreChange.classList.remove('decreasing')
    } else {
      this.scoreValue.textContent = n
      this.scoreValue.classList.add('decreasing')
      this.scoreValue.classList.remove('increasing')
      this.scoreChange.textContent = m
      this.scoreChange.classList.add('decreasing')
      this.scoreChange.classList.remove('increasing')
    }
  }

  streak (n = 0) {
    this.streakTitle.textContent = 'streak'
    this.streakValue.textContent = n
  }

  spm (n = 0) {
    this.spmTitle.textContent = 'spm'
    this.spmValue.textContent = n
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
    this.streak(scoreboard.streak)
  }

}
