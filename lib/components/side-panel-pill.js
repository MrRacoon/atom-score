'use babel';

class SidePanelPill extends HTMLElement {
  constructor() { super(); }

  attachedCallback () {

    // This
    this.classList.add('side-panel-pill');

    // Label
    this.label = document.createElement('div');
    this.label.classList.add('side-panel-pill-label');
    this.appendChild(this.label);

    // Value
    this.value = document.createElement('div');
    this.value.classList.add('side-panel-pill-value');
    this.appendChild(this.value);
  }

  setLabel (label = '') {
    if (this.label) { this.label.textContent = label; }
    return this;
  }

  setValue (value = '') {
    if (this.value) { this.value.textContent = value; }
    return this;
  }

  setColor (value = '') {
    this.value.setAttribute('style', `color: ${value};`);
  }
}


const SidePanelPillComponent = document.registerElement('atom-score-side-panel-pill', {
  prototype: Object.create(SidePanelPill.prototype),
});

export default SidePanelPillComponent;
