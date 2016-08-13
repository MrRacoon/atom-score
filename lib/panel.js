'use babel';

import score from './score'

class Panel extends HTMLElement {

  constructor (state = {}) {
    super()
    this.state = state
  }

  createdCallback() {
    this.container = document.createElement('div')
    this.container.classList.add('atom-score-panel')
    // this.score = new scoreComp.panelPill()

    this.brand = document.createElement('div')
    this.brand.textContent = 'Atom Score'
    this.brand.classList.add('inline-block')
    this.container.appendChild(this.brand)

    this.score = document.createElement('div')
    this.score.textContent = 'asdf'
    this.score.classList.add('inline-block')
    this.container.appendChild(this.score)

    const panel = atom.workspace.addTopPanel({
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

  setState(state) {
    // console.log(state)
    if (this.score) {
      this.score.textContent = state.score
    }
    //this.score.set(state.score)
  }
}

export const panelComp = document.registerElement('atom-score-panel', {
  prototype: Panel.prototype,
  extends:'div'
})

export default panelComp
