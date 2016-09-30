'use babel';

import { lookupStimuli } from '../behavior/stimuli';
import { predictor, history } from '../selectors.js';
import { propertyOf } from 'lodash/fp';
import {
  max,
  sum,
  scaleLinear,
  descending,
  easeCircleOut,
  interpolateString,
  select,
} from 'd3';

class RelativeBarChart extends HTMLElement {
  constructor (initialState) {
    super(initialState);
  }

  createdCallback () {
    this.root = select(this)
      .append('div')
      .attr('class', 'relative-bar-chart');
  }

  attachedCallback () { }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const STARTING_HEIGHT = 150;
    const maxWidth = bounds.width;

    const hist = history(state).toJS();
    const keys = Object.keys(hist);
    const vals = keys.map(propertyOf(hist));
    const objs = keys.map(k => lookupStimuli(k));

    const maximum = max(vals);

    const posScore = sum(objs.map(o => o.points * hist[o.id]).filter(c => c > 0));
    const negScore = sum(objs.map(o => o.points * hist[o.id]).filter(c => c < 0));

    const widthScale = scaleLinear()
      .domain([0,maximum])
      .range([1,maxWidth]);

    const color = stimulus => stimulus.points > 0 ? 'green' : stimulus.points < 0 ? 'red' : 'blue';

    const opacity = stimulus => {
      const net = stimulus.points * hist[stimulus.id];
      var total = stimulus.points >= 0 ? posScore : negScore;
      return Math.abs(net / total) * 3;
    };

    const topScale = (d, i) => (STARTING_HEIGHT + (i*30)) + 'px';

    const textDisplay = stimulus => {
      return stimulus.points + 'x' + hist[stimulus.id] + ' : ' + stimulus.combo;
    };

    const textColor = stimulus => {
      const isCurrent   = stimulus.id === state.last.id;
      const isPredicted = stimulus.combo === predictor(state);

      switch (true) {
      //case isCurrent && isPredicted               : return 'lightgrey'
      case isCurrent                              : return 'blue';
      case isPredicted                            : return 'yellow';
      default                                     : return 'white';
      }
    };

    var bars = this.root
      .selectAll('.entry')
      .data(objs, o => o.id);

    bars.enter()
      .append('div')
        .attr('class', 'entry')
        .style('top', '0px');

    bars.exit().remove();

    bars.sort((a,b) => descending(hist[a.id], hist[b.id]))
        .html(textDisplay)
        .transition()
          .duration(500)
          .ease(easeCircleOut)
          .style('color', textColor)
          .style('background-color', color)
          .style('opacity', opacity)
          .style('top', topScale)
          .styleTween('width', function (o) {
            const from = this.style.width;
            const to   = widthScale(hist[o.id]) + 'px';
            return interpolateString(from, to);
          });
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
});

export default RelativeBarChartComponent;
