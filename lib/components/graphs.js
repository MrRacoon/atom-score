'use babel';

import * as d3 from 'd3';
import * as mungers from '../mungers';

class RelativeBarChart extends HTMLElement {
  constructor (initialState) {
    super(initialState);
  }

  createdCallback () {
    this.root = d3.select(this)
      .append('div')
      .attr('class', 'relative-bar-chart');
  }

  attachedCallback () { }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect();
    const STARTING_HEIGHT = 150;
    const maxWidth = bounds.width;

    const hist = state.history.toJS();
    const lookup = d => hist[d];
    //const cmp = (a, b) => lookup(b) - lookup(a)

    const keys = Object.keys(hist);
    const vals = keys.map(lookup);
    const objs = keys.map(k => mungers.lookupStimulus(k));
    //const min    = d3.min(vals)
    const max    = d3.max(vals);
    //const mean   = d3.mean(vals)
    //const median = d3.median(vals)

    const posScore = d3.sum(objs.map(o => o.points * lookup(o.id)).filter(c => c > 0));
    const negScore = d3.sum(objs.map(o => o.points * lookup(o.id)).filter(c => c < 0));

    const widthScale = d3.scaleLinear()
      .domain([0,max])
      .range([1,maxWidth]);

    const color = stimulus => stimulus.points > 0 ? 'green' : stimulus.points < 0 ? 'red' : 'blue';

    const opacity = stimulus => {
      const net = stimulus.points * lookup(stimulus.id);
      var total = stimulus.points >= 0 ? posScore : negScore;
      return Math.abs(net / total) * 3;
    };

    const topScale = (d, i) => (STARTING_HEIGHT + (i*30)) + 'px';

    const textDisplay = stimulus => {
      return stimulus.points + 'x' + lookup(stimulus.id) + ' : ' + stimulus.combo;
    };

    const textColor = stimulus => {
      const isCurrent   = stimulus.id === state.last.id;
      const isPredicted = stimulus.combo === mungers.predict(state);

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
        //.style('top', (d, i) => (60 + (i*30)) + 'px')

    bars.exit().remove();

    bars.sort((a,b) => d3.descending(lookup(a.id), lookup(b.id)))
        .html(textDisplay)
        .transition()
          .duration(500)
          .ease(d3.easeCircleOut)
          .style('color', textColor)
          .style('background-color', color)
          .style('opacity', opacity)
          .style('top', topScale)
          // .styleTween('top', (d, i) => d3.interpolateString(this.style.top, (60 + (i*30)) + 'px' ))
          .styleTween('width', function (o) {
            const from = this.style.width;
            const to   = widthScale(lookup(o.id)) + 'px';
            return d3.interpolateString(from, to);
          });
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
});

export default RelativeBarChartComponent;
