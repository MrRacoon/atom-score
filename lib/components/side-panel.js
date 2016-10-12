'use babel';

import RelativeBarChart from './graphs';
import SidePanelPill from './side-panel-pill';
import * as select from '../selectors';

class SidePanel extends HTMLElement {
  createdCallback() {
    this.classList.add('atom-score-side-panel');
    this.setWidth(atom.config.get('atom-score.sideBarWidth'));
    this.score = new SidePanelPill();
    this.appendChild(this.score);
    this.streak = new SidePanelPill();
    this.appendChild(this.streak);
    this.counter = new SidePanelPill();
    this.appendChild(this.counter);
    this.avg = new SidePanelPill();
    this.appendChild(this.avg);
    this.recent = new SidePanelPill();
    this.appendChild(this.recent);
    this.last = new SidePanelPill();
    this.appendChild(this.last);
    this.guess = new SidePanelPill();
    this.appendChild(this.guess);
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
    this.score.setValue(0);
    this.streak.setLabel('streak');
    this.streak.setValue('0 (-/-)');
    this.avg.setLabel('avg');
    this.avg.setValue(0);
    this.counter.setLabel('count');
    this.counter.setValue(0);
    this.recent.setLabel('recent');
    this.recent.setValue('');
    this.last.setLabel('last');
    this.last.setValue('');
    this.guess.setLabel('guess');
    this.guess.setValue('');
    atom.config.observe('atom-score.sideBarWidth', this.setWidth.bind(this));
  }

  setState(state) {
    const s   = select.score(state);
    const sh  = select.high(state);
    const sl  = select.low(state);

    const st  = select.streak(state);
    const sth = select.streakH(state);
    const stl = select.streakL(state);

    const pts = select.lastPoints(state);
    const avg = select.avgScore(state);
    const c   = (pts > 0) ? 'green' : (pts < 0) ? 'red' : '';
    this.score.setValue(`${s}${pts >= 0 ? '+'+pts : pts} (${sl}/${sh})`);
    this.streak.setValue(`${st} (${stl}/${sth})`);
    this.avg.setValue(avg);
    this.counter.setValue(select.count(state));
    this.recent.setValue(select.comboString(state));
    this.last.setValue(select.lastCommand(state));
    this.last.setColor(c);
    this.guess.setValue(select.predict(state));
    this.graph.update(state);
  }

  setWidth (w) { this.style.width = `${w}px`; }
  show() { this.sidePanel.show(); }
  hide() { this.sidePanel.hide(); }
}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
});

export default SidePanelComponent;
