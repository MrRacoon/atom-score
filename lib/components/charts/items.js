'use babel';

import { prop } from 'ramda';
import * as selectors from '../../selectors';
import { select } from 'd3';
import {
  TRANSITION_DURATION,
  TRANSITION_DELAY,
  TRANSITION_EASE,
  topScale,
  itemText,
  itemHover,
  itemUnHover
} from './constants';


class ItemList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'item-list');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const items = selectors.items(state);
    if (!items || !items.length) { return; }

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', `${bounds.bottom}px`)
        .on('mouseover', itemHover)
        .on('mouseout', itemUnHover)
        .merge(bars)
          .html(itemText)
            .transition()
            .delay(TRANSITION_DELAY)
            .duration(TRANSITION_DURATION)
            .ease(TRANSITION_EASE)
              .style('top', topScale);

    bars.exit()
      .transition()
      .duration(TRANSITION_DURATION)
      .ease(TRANSITION_EASE)
        .style('top', `${bounds.top}px`)
        .remove();
  }
}

const ItemListComponent = document.registerElement('atom-score-item-list', {
  prototype: Object.create(ItemList.prototype),
});

export default ItemListComponent;
