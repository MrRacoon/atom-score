'use babel';

import { prop } from 'ramda';
import * as selectors from '../../selectors';
import {
  easeCircleOut,
  select,
} from 'd3';


class ItemList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'item-list');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const STARTING_HEIGHT = 200;

    const items = selectors.items(state);

    if (!items || items.isEmpty) { return; }

    const topScale = (d, i) =>
      `${STARTING_HEIGHT + (i*20)}px`;

    const textDisplay = item =>
      `lvl.${item.level} ${item.enchantment} ${item.name} of ${item.origin}`;

    const bars = this.root
      .selectAll('.as-item')
      .data(items.bag, prop('id'));

    bars.enter()
      .append('div')
        .attr('class', 'as-item')
        .style('top', `${bounds.bottom}px`);

    bars.exit().remove();

    bars
      .html(textDisplay)
        .transition()
        .duration(500)
        .ease(easeCircleOut)
          .style('top', topScale);
  }
}

const ItemListComponent = document.registerElement('atom-score-item-list', {
  prototype: Object.create(ItemList.prototype),
});

export default ItemListComponent;
