'use babel'

import RelativeBarChart from './graphs'
import { lastCommandName } from '../mungers'

class SidePanel extends HTMLElement {
  constructor (i) {
    super(i)
  }

  createdCallback() {
    this.classList.add('atom-score-side-panel')

    this.score = document.createElement('div')
    this.appendChild(this.score)

    this.count = document.createElement('div')
    this.appendChild(this.count)

    this.recent = document.createElement('div')
    this.appendChild(this.recent)

    this.graph = new RelativeBarChart()
    this.appendChild(this.graph)

    atom.workspace.addRightPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  attachedCallback () {
    this.score.textContent = 'score = '
    this.count.textContent = 'count = '
    this.recent.textContent = 'recent = '
  }

  setState (state) {
    this.score.textContent  = `score = ${state.score}`
    this.count.textContent  = `count = ${state.count}`
    this.recent.textContent = `recent = ${lastCommandName(state)}`
    this.graph.update(state)
  }

}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
})

export default SidePanelComponent
