'use babel';

import RelativeBarChart from './graphs';
import SidePanelPill from './side-panel-pill';
import * as select from '../selectors';
import { score, recent, counter, last } from '../state';

class SidePanel extends HTMLElement {
  constructor (i) {
    super(i);
  }

  createdCallback() {
    this.classList.add('atom-score-side-panel');

    this.score = new SidePanelPill();
    this.appendChild(this.score);

    this.counter = new SidePanelPill();
    this.appendChild(this.counter);

    this.last = new SidePanelPill();
    this.appendChild(this.last);

    this.recent = new SidePanelPill();
    this.appendChild(this.recent);

    this.graph = new RelativeBarChart();
    this.appendChild(this.graph);

    atom.workspace.addRightPanel({
      item: this,
      visible: true,
      priority: 1
    });
  }

  attachedCallback () {
    this.score.setLabel('score');
    this.score.setValue(score.INITIAL_STATE);
    this.counter.setLabel('count');
    this.counter.setValue(counter.INITIAL_STATE);
    this.last.setLabel('last');
    this.last.setValue(last.INITIAL_STATE);
    this.recent.setLabel('recent');
    this.recent.setValue(recent.INITIAL_STATE);
  }

  setState(state) {
    this.score.setValue(select.score(state));
    this.counter.setValue(select.count(state));
    this.last.setValue(select.lastName(state));
    this.recent.setValue(select.comboString(state));
    this.graph.update(state);
  }
}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
});

export default SidePanelComponent;
