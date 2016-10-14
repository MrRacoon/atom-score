'use babel';

import SidePanelPill from './side-panel-pill';
import { EquipList, ItemList, PointsHistogram } from './charts';
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

    this.selection = document.createElement('div');
    this.selection.classList.add('side-panel-selection');
    this.appendChild(this.selection);

    this.flexContent = document.createElement('div');
    this.flexContent.classList.add('flex-content');
    this.selection.appendChild(this.flexContent);

    this.selectNil = document.createElement('button');
    this.selectNil.classList.add('btn');
    this.selectNil.classList.add('select-btn');
    this.selectNil.textContent = 'None';
    this.selectNil.onclick = (e) => {
      e.preventDefault();
      this.showNothing();
    };
    this.flexContent.appendChild(this.selectNil);

    this.selectGraph = document.createElement('button');
    this.selectGraph.classList.add('btn');
    this.selectGraph.classList.add('select-btn');
    this.selectGraph.textContent = 'Points';
    this.selectGraph.onclick = (e) => {
      e.preventDefault();
      this.showGraph(this.lastState);
    };
    this.flexContent.appendChild(this.selectGraph);

    this.selectItems = document.createElement('button');
    this.selectItems.classList.add('btn');
    this.selectItems.classList.add('select-btn');
    this.selectItems.textContent = 'Items';
    this.selectItems.onclick = (e) => {
      e.preventDefault();
      this.showItems(this.lastState);
    };
    this.flexContent.appendChild(this.selectItems);

    this.selectEquip = document.createElement('button');
    this.selectEquip.classList.add('btn');
    this.selectEquip.classList.add('select-btn');
    this.selectEquip.textContent = 'Equip';
    this.selectEquip.onclick = (e) => {
      e.preventDefault();
      this.showEquip(this.lastState);
    };
    this.flexContent.appendChild(this.selectEquip);

    this.graph = new PointsHistogram();
    this.appendChild(this.graph);

    this.items = new ItemList();
    this.appendChild(this.items);

    this.equip = new EquipList();
    this.appendChild(this.equip);

    this.sidePanel = atom.workspace.addRightPanel({
      item: this,
      visible: true,
      priority: 1
    });

    this.showItems();
  }

  showNothing() {
    this.selected = '';
    this.graph.classList.add('hidden');
    this.items.classList.add('hidden');
    this.equip.classList.add('hidden');
  }

  showGraph(state) {
    this.showNothing();
    this.selected = 'graph';
    this.graph.classList.remove('hidden');
    this.graph.update(state || this.lastState);
  }

  showItems(state) {
    this.showNothing();
    this.selected = 'items';
    this.items.classList.remove('hidden');
    this.items.update(state || this.lastState);
  }

  showEquip(state) {
    this.showNothing();
    this.selected = 'equip';
    this.equip.classList.remove('hidden');
    this.equip.update(state || this.lastState);
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

    const pp = select.predictedStim(state) || {};

    this.score.setValue(`${s}${pts >= 0 ? '+'+pts : pts} (${sl}/${sh})`);
    this.streak.setValue(`${st} (${stl}/${sth})`);
    this.avg.setValue(avg);
    this.counter.setValue(select.count(state));
    this.recent.setValue(select.comboString(state));
    this.last.setValue(select.lastCommand(state));
    this.last.setColor(c);
    this.guess.setValue(pp.command);

    this.selected === 'graph' && this.graph.update(state);
    this.selected === 'items' && this.items.update(state);
    this.selected === 'equip' && this.equip.update(state);

    this.lastState = state;
  }

  destroy () { this.panel.remove(); }
  setWidth (w) { this.style.width = `${w}px`; }
  show() { this.sidePanel.show(); }
  hide() { this.sidePanel.hide(); }
}

const SidePanelComponent = document.registerElement('atom-score-side-panel', {
  prototype: Object.create(SidePanel.prototype),
});

export default SidePanelComponent;
