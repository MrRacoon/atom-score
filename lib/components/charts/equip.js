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
  itemColor,
  tipShow,
  tipHide
} from './constants';

class EquipList extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'equip-list');

    this.tip = select(this)
      .append('div')
      .attr('class', 'tool-tip');
  }

  update (state) {
    const items = selectors.equipmentList(state);

    function itemHover(d) {
      select(this)
        .style('opacity', 0.5);

      select('.tool-tip')
        .call(tipShow(d));
    }

    function itemUnHover() {
      select(this)
        .style('opacity', 1);

      select('.tool-tip')
        .call(tipHide());
    }

    const bars = this.root
      .selectAll('.as-item')
      .data(items, prop('id'));

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

    bars.exit().remove();

  }
}

const EquipListComponent = document.registerElement('atom-score-equip-list', {
  prototype: Object.create(EquipList.prototype),
});

export default EquipListComponent;
