'use babel';

export default class AtomScoreStatPanel {
  constructor (state = {}) {
    this.state = {
      item: document.createElement('div'),
      visible: state.visible || true,
      priority: state.priority || 10
    }

    this.state.item.textContent = 'Atom Score |'
    this.state.item.classList.add('atom-score-panel')

    this.panel = atom.workspace.addTopPanel(this.state)
  }

  serialize () {
    return {
      visible: this.state.visible,
      priority: this.state.priority
    }
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

  setScore(scoreboard) {
    this.state.item.textContent = `Atom Score | pts : ${scoreboard.score} | apm : ${scoreboard.apm} | last : ${scoreboard.commandString.join('')}`
  }

}
