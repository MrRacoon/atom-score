'use babel';

import { prop } from 'ramda';
import * as selectors from '../../selectors';
import {
  easeCircleOut,
  select,
} from 'd3';


class EquipList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'equip-list');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const STARTING_HEIGHT = 200;

    const items = selectors.equipmentList(state);

    if (!items || items.isEmpty) { return; }

    const topScale = (d, i) =>
      `${STARTING_HEIGHT + (i*20)}px`;

    const textDisplay = item =>
      `lvl.${item.level} ${item.wear} ${item.enhance} ${item.name} (${item.type})`;

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', `${bounds.top}px`)
        .merge(bars)
          .html(textDisplay)
            .transition()
            .duration(500)
            .ease(easeCircleOut)
              .style('top', topScale);

    bars.exit().remove();

  }
}

const EquipListComponent = document.registerElement('atom-score-equip-list', {
  prototype: Object.create(EquipList.prototype),
});

export default EquipListComponent;
