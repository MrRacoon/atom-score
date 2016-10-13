'use babel';

class Panel extends HTMLElement {

  constructor () {
    super();
  }

  createdCallback() {
    this.classList.add('atom-score-panel');

    this.p = document.createElement('div');
    this.p.classList.add('atom-score-panel-space');
    this.appendChild(this.p);

    this.panel = atom.workspace.addTopPanel({
      item     : this,
      visible  : true,
      priority : 1
    });
  }

  attachedCallback() {

  }

  serialize () {
    return { };
  }

  destroy () {
    this.panel.remove();
  }

  hide () {
    return this.panel.hide();
  }

  show () {
    return this.panel.show();
  }

  setState(state) {
    if (state.items) {
      const items = state.items;
      if (!items.empty && items.last) {
        this.p.textContent =
          `Found ${items.last.enchantment} ${items.last.name} of ${items.last.origin} (lvl.${items.last.level})`;
        return;
      }
    }
    this.p.textContent = 'No Items';
  }
}

const PanelComponent = document.registerElement('atom-score-panel', {
  prototype: Object.create(Panel.prototype),
});

export default PanelComponent;
