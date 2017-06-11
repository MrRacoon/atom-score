'use babel';

import h from 'hyperscript';
import SidePanelPill from './side-panel-pill';
import { EquipList, ItemList, PointsHistogram } from './charts';
import { map, propOr } from 'ramda';
import { select } from '../state';

class SidePanel extends HTMLElement {
  createdCallback() {
    this.classList.add('atom-score-side-panel');
    this.setWidth(atom.config.get('atom-score.sideBarWidth'));

    ['score', 'streak', 'counter', 'avg', 'recent', 'last', 'guess']
      .map(label => {
        this[label] = new SidePanelPill();
        this.appendChild(this[label]);
      });

    this.selection = h('div.side-panel-selection');
    this.appendChild(this.selection);


    this.flexContent = h('div.flex-content');
    this.selection.appendChild(this.flexContent);

    this.selectNil = h('div.btn.select-btn', {
      onclick: (e) => {
        e.preventDefault();
        this.page('nothing');
      },
    }, 'None');
    this.flexContent.appendChild(this.selectNil);

    this.selectGraph = h('div.btn.select-btn', {
      onclick: (e) => {
        e.preventDefault();
        this.page('graph');
      },
    }, 'Points');

    this.flexContent.appendChild(this.selectGraph);

    this.selectItems = h('div.btn.select-btn', {
      onclick: (e) => {
        e.preventDefault();
        this.page('items');
      }
    }, 'Items');
    this.flexContent.appendChild(this.selectItems);

    this.selectEquip = h('div.btn.select-btn', {
      onclick: (e) => {
        e.preventDefault();
        this.page('equip');
      }
    }, 'Equip');
    this.flexContent.appendChild(this.selectEquip);

    this.toolTip = h('div.tool-tip');
    this.appendChild(this.toolTip);

    this.graph = new PointsHistogram();
    this.appendChild(this.graph);

    this.items = new ItemList();
    this.appendChild(this.items);

    this.equip = new EquipList();
    this.appendChild(this.equip);

    this.sidePanel = atom.workspace.addRightPanel({
      item: this, visible: true, priority: 1
    });

    this.page('graph');
  }

  page (page, state) {
    this.selected = page;
    // Hide all
    this.graph.classList.add('hidden');
    this.items.classList.add('hidden');
    this.equip.classList.add('hidden');
    // Show and update the chosen one
    if (this[page]) {
      this[page].classList.remove('hidden');
      this[page].update(state || this.lastState);
    }
  }

  attachedCallback () {
    // Initialize all panel pills
    this.score.set('score', 0);
    this.streak.set('streak', '0 (-/-)');
    this.counter.set('counter', 0);
    this.avg.set('avg', 0);
    this.recent.set('recent', '');
    this.last.set('last', '');
    this.guess.set('guess', '');
    // Set a listener for wdth changes
    atom.config.observe('atom-score.sideBarWidth', this.setWidth.bind(this));
  }

  setState(state) {
    const s   = state.score.curr;
    const sh  = state.score.hi;
    const st  = state.streak.curr;
    const sth = state.streak.hi;
    const stl = state.streak.lo;
    const pts = (state.last || {}).points;
    const avg = state.score.curr / state.counter;
    const c   = (pts > 0) ? 'green' : (pts < 0) ? 'red' : '';
    const combo = map(propOr('', 'combo'), state.recent).join('');
    const last = (state.last || {}).id;
    // const guess = select.predictor.guess(state)(state.last);

    this.score.setValue(`${s} ${pts >= 0 ? '+'+pts : pts} (${sh})`);
    this.streak.setValue(`${st} (${stl}/${sth})`);
    this.avg.setValue(avg);
    this.counter.setValue(state.counter);
    this.recent.setValue(combo);
    this.last.setValue(last);
    this.last.setColor(c);
    // this.guess.setValue(guess);

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
