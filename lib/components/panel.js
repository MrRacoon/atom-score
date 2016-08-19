'use babel'

import PanelPill from './panel-pill'

import * as munge from '../mungers'

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

    this.last = new PanelPill()
    this.appendChild(this.last)

    this.predictor = new PanelPill()
    this.appendChild(this.predictor)

    this.recent = new PanelPill()
    this.appendChild(this.recent)

    this.panel = atom.workspace.addTopPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  attachedCallback() {
    this.score.setLabel('score')
    this.score.setValue(munge.initialScore())
    this.counter.setLabel('count')
    this.counter.setValue(munge.initialCount())
    this.last.setLabel('last')
    this.last.setValue(munge.initialLast())
    this.predictor.setLabel('predict')
    this.predictor.setValue('')
    this.recent.setLabel('recent')
    this.recent.setValue(munge.initialRecent())
  }

  serialize () { return { } }

  destroy () { this.panel.remove() }

  hide () { return this.panel.hide() }

  show () { return this.panel.show() }

  setState(state) {
    this.score.setValue(munge.getScore(state))
    this.counter.setValue(munge.getCount(state))
    this.last.setValue(munge.lastCommandName(state))
    this.predictor.setValue(munge.predict(state))
    this.recent.setValue(munge.recentVimString(state))
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
})

export default PanelComponent
