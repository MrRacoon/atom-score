'use babel';

import { identity, keys, max, prop, reduce, values } from 'ramda';
import { lookupStimulus } from '../../behavior/stimuli';
import { topScale } from './utils';
import {
  descending, interpolateString, scaleLinear, select
} from 'd3';
import {
  TRANSITION_DURATION, TRANSITION_DELAY, TRANSITION_EASE
} from '../../constants';


class PointsHistogram extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'relative-bar-chart');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();

    const hist = state.history;
    const histLookup = stim => hist[stim.id];

    const ks  = keys(state.history);
    const vs  = values(state.history);
    const objs = ks
      .map(k => lookupStimulus(k))
      .filter(identity);

    const widthScale = scaleLinear()
      .domain([0,reduce(max, -Infinity, vs)])
      .range([1,bounds.width - 10]);

    const classScale = stimulus =>
      stimulus.points >= 0 ?
        'entry pos':
        'entry neg';

    const textColor = stim =>
      state.last.id === stim.id ? 'white' : '';

    const textDisplay = stimulus =>
      `${stimulus.points}*${histLookup(stimulus)} ${stimulus.command}`;

    const bars = this.root
      .selectAll('.entry')
      .data(objs, prop('id'));

    bars.exit().remove();

    bars.enter()
      .append('div')
        .attr('class', classScale)
        .style('top', bounds.top)
        .merge(bars)
          .sort((a,b) => descending(histLookup(a), histLookup(b)))
          .html(textDisplay)
            .transition()
            .delay(TRANSITION_DELAY)
            .duration(TRANSITION_DURATION)
            .ease(TRANSITION_EASE)
              .style('top', topScale)
              .style('color', textColor)
              .styleTween('width', function (o) {
                const from = this.style.width;
                const to   = `${widthScale(histLookup(o))}px`;
                return interpolateString(from, to);
              });
  }
}

const PointsHistogramComponent = document.registerElement('atom-score-points-histogram', {
  prototype: Object.create(PointsHistogram.prototype),
});

export default PointsHistogramComponent;
