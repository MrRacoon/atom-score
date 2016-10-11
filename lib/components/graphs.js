'use babel';

import { lookupStimuli } from '../behavior/stimuli';
import { history, historyKeys, historyVals } from '../selectors.js';
import { reduce, max, prop } from 'ramda';
import {
  descending,
  easeCircleOut,
  interpolateString,
  scaleLinear,
  select,
} from 'd3';

class RelativeBarChart extends HTMLElement {
  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'relative-bar-chart');
  }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const STARTING_HEIGHT = Object.keys(state).length * 25;

    const hist = history(state);
    const histLookup = stim => hist[stim.id];

    const objs = historyKeys(state)
      .map(k => lookupStimuli(k));

    const widthScale = scaleLinear()
      .domain([0,reduce(max, -Infinity, historyVals(state))])
      .range([1,bounds.width - 10]);

    const classScale = stimulus =>
      stimulus.points >= 0 ?
        'entry pos':
        'entry neg';

    const topScale = (d, i) =>
      `${STARTING_HEIGHT + (i*20)}px`;

    const textColor = stim =>
      state.last.id === stim.id ? 'white' : '';

    const textDisplay = stimulus =>
      `${stimulus.points}*${histLookup(stimulus)} ${stimulus.command}`;

    const bars = this.root
      .selectAll('.entry')
      .data(objs, prop('id'));

    bars.enter()
      .append('div')
        .attr('class', classScale)
        .style('top', '0px');

    bars.exit().remove();

    bars
      .sort((a,b) => descending(histLookup(a), histLookup(b)))
      .html(textDisplay)
        .transition()
        .duration(500)
        .ease(easeCircleOut)
          .style('top', topScale)
          .style('color', textColor)
          .styleTween('width', function (o) {
            const from = this.style.width;
            const to   = `${widthScale(histLookup(o))}px`;
            return interpolateString(from, to);
          });
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
});

export default RelativeBarChartComponent;
