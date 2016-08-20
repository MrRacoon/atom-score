'use babel'

import RelativeBarChart from './graphs'
import { lastCommandName } from '../mungers'
import SidePanelPill from './side-panel-pill'
import * as munge from '../mungers'

class SidePanel extends HTMLElement {
  constructor (i) {
    super(i)
  }

  createdCallback() {
    this.classList.add('atom-score-side-panel')

    this.score = new SidePanelPill()
    this.appendChild(this.score)

    this.counter = new SidePanelPill()
    this.appendChild(this.counter)

    this.last = new SidePanelPill()
    this.appendChild(this.last)

    this.recent = new SidePanelPill()
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
    this.score.setLabel('score')
    this.score.setValue(munge.initialScore())
    this.counter.setLabel('count')
    this.counter.setValue(munge.initialCount())
    this.last.setLabel('last')
    this.last.setValue(munge.initialLast())
    this.recent.setLabel('recent')
    this.recent.setValue(munge.initialRecent())
  }

  setState (state) {
    this.score.setValue(munge.getScore(state))
    this.counter.setValue(munge.getCount(state))
    this.last.setValue(munge.lastCommandName(state))
    this.recent.setValue(munge.predict(state) + ' '+ munge.recentVimString(state))

    this.graph.update(state)
  }

}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
})

export default SidePanelComponent
