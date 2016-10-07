'use babel';

import RelativeBarChart from './graphs';
import SidePanelPill from './side-panel-pill';
import * as select from '../selectors';
import { score, recent, counter, last } from '../state';

class SidePanel extends HTMLElement {
  createdCallback() {
    this.classList.add('atom-score-side-panel');

    this.setWidth(atom.config.get('atom-score.sideBarWidth'));

    this.score = new SidePanelPill();
    this.appendChild(this.score);

    this.avg = new SidePanelPill();
    this.appendChild(this.avg);

    this.counter = new SidePanelPill();
    this.appendChild(this.counter);

    this.last = new SidePanelPill();
    this.appendChild(this.last);

    this.recent = new SidePanelPill();
    this.appendChild(this.recent);

    this.graph = new RelativeBarChart();
    this.appendChild(this.graph);

    this.sidePanel = atom.workspace.addRightPanel({
      item: this,
      visible: true,
      priority: 1
    });
  }

  attachedCallback () {
    this.score.setLabel('score');
    this.score.setValue(score.INITIAL_STATE);
    this.avg.setLabel('avg');
    this.avg.setValue(0);
    this.counter.setLabel('count');
    this.counter.setValue(counter.INITIAL_STATE);
    this.last.setLabel('last');
    this.last.setValue(last.INITIAL_STATE);
    this.recent.setLabel('recent');
    this.recent.setValue(recent.INITIAL_STATE);

    atom.config.observe('atom-score.sideBarWidth', this.setWidth.bind(this));
  }

  setState(state) {
    const s = select.score(state);
    const l = select.lastPoints(state);
    const avg = select.avgScore(state);
    const c = (l > 0) ? 'green' : (l < 0) ? 'red' : '';

    this.score.setValue(s);

    this.avg.setValue(avg);

    this.counter.setValue(select.count(state));

    this.last.setValue(select.lastName(state));
    this.last.setColor(c);

    this.recent.setValue(select.comboString(state));

    // this.graph.update(state);
  }

  setWidth (w) {
    this.style.width = `${w}px`;
  }

  show() {
    this.sidePanel.show();
  }

  hide() {
    this.sidePanel.hide();
  }
}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
});

export default SidePanelComponent;
