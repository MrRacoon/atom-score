'use babel';

import { prop } from 'ramda';
import { select } from 'd3';
import * as selectors from '../../selectors';
import {
  TRANSITION_DURATION,
  TRANSITION_DELAY,
  TRANSITION_EASE,
  topScale,
  itemText,
  itemHover,
  itemUnHover
} from './constants';


class EquipList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'equip-list');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();

    const items = selectors.equipmentList(state);

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', `${bounds.top}px`)
        .on('mouseover', itemHover)
        .on('mouseout', itemUnHover)
        .merge(bars)
          .html(itemText)
            .transition()
            .delay(TRANSITION_DELAY)
            .duration(TRANSITION_DURATION)
            .ease(TRANSITION_EASE)
              .style('top', topScale);

    bars.exit().remove();

  }
}

const EquipListComponent = document.registerElement('atom-score-equip-list', {
  prototype: Object.create(EquipList.prototype),
});

export default EquipListComponent;
