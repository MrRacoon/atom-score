'use babel';
import h from 'hyperscript';

class SidePanelPill extends HTMLElement {
  constructor() { super(); }

  attachedCallback () {
    this.label = h('div.side-panel-pill-label');
    this.value = h('div.side-panel-pill-value');

    this.elem = h('div.side-panel-pill',
      this.label,
      this.value
    );

    this.appendChild(this.elem);
  }

  setLabel (label = '') {
    if (this.label) { this.label.textContent = label; }
  }

  setValue (value = '') {
    if (this.value) { this.value.textContent = value; }
  }

  setColor (value = '') {
    this.value.setAttribute('style', `color: ${value};`);
  }
}


const SidePanelPillComponent = document.registerElement('atom-score-side-panel-pill', {
  prototype: Object.create(SidePanelPill.prototype),
});

export default SidePanelPillComponent;
