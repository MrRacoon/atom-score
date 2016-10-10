'use babel';

import { lookupStimuli } from '../behavior/stimuli';
import { history } from '../selectors.js';
import { propertyOf } from 'lodash/fp';
import {
  descending,
  easeCircleOut,
  interpolateString,
  max,
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
    const STARTING_HEIGHT = 175;
    const maxWidth = bounds.width;

    const hist = history(state);
    const keys = Object.keys(hist);
    const vals = keys.map(propertyOf(hist));
    const objs = keys.map(k => lookupStimuli(k));

    const maximum = max(vals);

    const widthScale = scaleLinear()
      .domain([0,maximum])
      .range([1,maxWidth]);

    const color = stimulus =>
      stimulus.points > 0 ?
      'green' :
      stimulus.points < 0 ?
      'red' :
      'blue';

    const topScale = (d, i) => `${STARTING_HEIGHT + (i*30)}px`;

    const textDisplay = stimulus =>
      `${stimulus.points}*${hist[stimulus.id]} ${stimulus.combo}`;

    const textColor = stimulus => {
      const isCurrent   = stimulus.id === state.last.id;

      switch (true) {
      case isCurrent   : return 'blue';
      default          : return 'white';
      }
    };

    const bars = this.root
      .selectAll('.entry')
      .data(objs, o => o.id);

    bars
      .enter()
      .append('div')
        .attr('class', 'entry')
        .style('top', '0px');

    bars
      .exit()
      .remove();

    bars
      .sort((a,b) => descending(hist[a.id], hist[b.id]))
      .html(textDisplay)
        .transition()
        .duration(500)
        .ease(easeCircleOut)
          .style('top', topScale)
          .style('color', textColor)
          .style('background-color', color)
          .styleTween('width', function (o) {
            const from = this.style.width;
            const to   = `${widthScale(hist[o.id])}px`;
            return interpolateString(from, to);
          });
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
});

export default RelativeBarChartComponent;
