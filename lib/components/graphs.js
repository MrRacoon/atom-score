'use babel'

import * as d3 from 'd3'
import * as mungers from '../mungers'

class RelativeBarChart extends HTMLElement {
  constructor (initialState) {
    super(initialState)
  }

  createdCallback () {
    this.root = d3.select(this)
      .append('div')
      .attr('class', 'relative-bar-chart')
  }

  attachedCallback () { }

  update (state) {
    const bounds = this.root.node().getBoundingClientRect()
    const STARTING_HEIGHT = 150
    const maxWidth = bounds.width;

    const hist = state.history.toJS()
    const lookup = d => hist[d]
    const cmp = (a, b) => lookup(b) - lookup(a)

    const keys = Object.keys(hist)
    const vals = keys.map(lookup)
    const objs = keys.map(k => mungers.lookupStimulus(k))
    //const min    = d3.min(vals)
    const max    = d3.max(vals)
    const mean   = d3.mean(vals)
    const median = d3.median(vals)

    const widthScale = d3.scaleLinear()
      .domain([0,max])
      .range([1,maxWidth])

    const colorScale = d3.scaleLinear()
      .domain([0, median, max])
      .range(['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,150,0,0.3)'])

    const topScale = (d, i) => (STARTING_HEIGHT + (i*30)) + 'px'

    const textDisplay = id => {
      return mungers.stimulusPoints(id) + 'x' + lookup(id) + ' : ' + mungers.stimulusCommand(id)
    }

    var bars = this.root
      .selectAll('.entry')
      .data(objs, o => o.id)

    bars.enter()
      .append('div')
        .attr('class', 'entry')
        .style('top', '0px')
        //.style('top', (d, i) => (60 + (i*30)) + 'px')

    bars.exit().remove()

    bars.sort((a,b) => d3.descending(lookup(a.id), lookup(b.id)))
        .html(o => textDisplay(o.id))
        .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .style('color', o => o.id === state.last.id ? 'red' : 'grey')
          .style('background-color', o => colorScale(lookup(o.id)))
          .style('top', topScale)
          // .styleTween('top', (d, i) => d3.interpolateString(this.style.top, (60 + (i*30)) + 'px' ))
          .styleTween('width', function (o) {
            const from = this.style.width
            const to   = widthScale(lookup(o.id)) + 'px'
            return d3.interpolateString(from, to)
          })
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
})

export default RelativeBarChartComponent
