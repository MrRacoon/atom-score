'use babel';

import { prop, values } from 'ramda';
import { select } from 'd3';
import {
  TRANSITION_DURATION,
  TRANSITION_DELAY,
  TRANSITION_EASE,
} from '../../constants';

import {
  topScale,
  itemText,
  itemHover,
  itemUnHover,
  itemColor
} from './utils';

class EquipList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'equip-list');
  }

  update (state) {
    const items = values(state.items.equipped);

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

    bars.exit()
      .transition()
      .delay(TRANSITION_DELAY)
      .duration(TRANSITION_DURATION)
      .ease(TRANSITION_EASE)
        .style('opacity', 0)
        .style('top', topScale)
        .remove();

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', 0)
        .style('color', itemColor)
        .on('mouseover', itemHover)
        .on('mouseout', itemUnHover)
        .merge(bars)
          .html(itemText)
            .transition()
            .delay(TRANSITION_DELAY)
            .duration(TRANSITION_DURATION)
            .ease(TRANSITION_EASE)
              .style('top', topScale);
  }
}

const EquipListComponent = document.registerElement('atom-score-equip-list', {
  prototype: Object.create(EquipList.prototype),
});

export default EquipListComponent;
