'use babel';

import PanelPill from './panel-pill';
import { score, count, last, recent } from '../state';
import select from '../selectors';
import { compose, property, over } from 'lodash/fp';

class Panel extends HTMLElement {

  constructor () {
    super();
  }

  createdCallback() {
    this.classList.add('atom-score-panel');

    this.score = new PanelPill();
    this.appendChild(this.score);

    this.counter = new PanelPill();
    this.appendChild(this.counter);

    this.last = new PanelPill();
    this.appendChild(this.last);

    this.predictor = new PanelPill();
    this.appendChild(this.predictor);

    this.recent = new PanelPill();
    this.appendChild(this.recent);

    this.panel = atom.workspace.addTopPanel({
      item     : this,
      visible  : true,
      priority : 1
    });
  }

  attachedCallback() {
    this.score.setLabel('score');
    this.score.setValue(score.INITIAL_STATE);
    this.counter.setLabel('count');
    this.counter.setValue(count.INITIAL_STATE);
    this.last.setLabel('last');
    this.last.setValue(last.INITIAL_STATE);
    this.predictor.setLabel('predict');
    this.predictor.setValue('');
    this.recent.setLabel('recent');
    this.recent.setValue(recent.INITIAL_STATE);
  }

  serialize () { return { }; }

  destroy () { this.panel.remove(); }

  hide () { return this.panel.hide(); }

  show () { return this.panel.show(); }

  setState(state) {
    over([
      compose(this.score.setValue, select.score),
      compose(this.counter.setValue, select.counter),
      compose(this.last.setValue, property('command'), select.last),
      compose(this.recent.setValue, select.comboString),
      compose(this.predictor.setValue, select.predict),
    ])(state);
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
});

export default PanelComponent;
