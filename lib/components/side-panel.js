'use babel'

import {} from '../state'
import {} from '../mungers'
import { barGraph } from './graphs'

class SidePanel extends HTMLElement {
  constructor (i) {
    super(i)
  }

  createdCallback() {
    this.classList.add('atom-score-side-panel')

    this.score = document.createElement('div')
    this.appendChild(this.score)

    this.graph = document.createElement('div')
    this.graph.classList.add('bar-chart')
    this.appendChild(this.graph)

    atom.workspace.addRightPanel({
      item: this,
      visible: true,
      priority: 1
    })
  }

  attachedCallback () {
    this.score.textContent = 'score = '
  }

  setState (state) {
    barGraph(this.graph, state)
    this.score.textContent = `score = ${state.score}`
  }

}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
})

export default SidePanelComponent
