'use babel'

import PanelPill from './panel-pill'

import score from '../score'
import last from '../last'
import recent from '../recent'
import counter from '../counter'

class Panel extends HTMLElement {

  constructor () {
    super()
  }

  createdCallback() {
    this.classList.add('atom-score-panel')
    // this.score = new scoreComp.panelPill()

    this.score = new PanelPill()
    this.appendChild(this.score)

    this.count = new PanelPill()
    this.appendChild(this.count)

    this.last = new PanelPill()
    this.appendChild(this.last)

    this.recent = new PanelPill()
    this.appendChild(this.recent)

    const panel = atom.workspace.addTopPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  attachedCallback() {
    this.score.setLabel('score')
    this.count.setLabel('count')
    this.last.setLabel('last')
    this.recent.setLabel('recent')

    this.score.setValue(score.constants.INITIAL_STATE)
    this.count.setValue(counter.constants.INITIAL_STATE)
    this.last.setValue(last.constants.INITIAL_STATE)
    this.recent.setValue(recent.constants.INITIAL_STATE)
  }

  serialize () { return { } }

  destroy () { this.panel.remove() }

  hide () { return this.panel.hide() }

  show () { return this.panel.show() }

  setState(state) {
    this.score.setValue(state.score)
    this.count.setValue(state.count)
    this.last.setValue(state.last.id)
    this.recent.setValue(state.recent.map(r => r.combo).join(''))
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
})

export default PanelComponent
