'use babel';

import PanelPill from './panel-pill'

import score from '../score'

class Panel extends HTMLElement {

  constructor () {
    super()
  }

  createdCallback() {
    this.classList.add('atom-score-panel')
    // this.score = new scoreComp.panelPill()

    this.brand = document.createElement('div')
    this.brand.classList.add('inline-block')
    this.brand.classList.add('panel-brand')
    this.appendChild(this.brand)

    this.score = new PanelPill()
    this.appendChild(this.score)

    this.count = new PanelPill()
    this.appendChild(this.count)

    this.last = new PanelPill()
    this.appendChild(this.last)

    const panel = atom.workspace.addTopPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  serialize () { return { } }

  destroy () { this.panel.remove() }

  hide () { return this.panel.hide() }

  show () { return this.panel.show() }

  setState(state) {
    this.score.setLabel('score:')
    this.score.setValue(state.score)
    this.count.setLabel('count')
    this.count.setValue(state.count)
    this.last.setLabel('last')
    this.last.setValue(state.last.id)
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
})

export default PanelComponent
