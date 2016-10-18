'use babel';

import { prop } from 'ramda';
import { selector } from '../../state';
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

class ItemList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'item-list');
  }

  update (state) {
    if (!selector) { return; }
    const bounds = this.root.node().getBoundingClientRect();
    const items = selector.items(state);
    if (!items || !items.length) { return; }

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

    bars.exit().remove();

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', `${bounds.bottom}px`)
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

const ItemListComponent = document.registerElement('atom-score-item-list', {
  prototype: Object.create(ItemList.prototype),
});

export default ItemListComponent;
