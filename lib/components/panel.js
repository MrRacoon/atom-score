'use babel'

import PanelPill from './panel-pill'

import { score, counter } from '../state'
import { getScore, getCount } from '../mungers'

class Panel extends HTMLElement {

  constructor () {
    super()
  }

  createdCallback() {
    this.classList.add('atom-score-panel')

    this.score = new PanelPill()
    this.appendChild(this.score)

    this.counter = new PanelPill()
    this.appendChild(this.counter)

    atom.workspace.addTopPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  attachedCallback() {
    this.score.setLabel('score')
    this.score.setValue(score.constants.INITIAL_STATE)
    this.counter.setLabel('count')
    this.counter.setValue(counter.constants.INITIAL_STATE)
  }

  serialize () { return { } }

  destroy () { this.panel.remove() }

  hide () { return this.panel.hide() }

  show () { return this.panel.show() }

  setState(state) {
    this.score.setValue(getScore(state))
    this.counter.setValue(getCount(state))
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
})

export default PanelComponent
