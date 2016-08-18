'use babel'

import * as d3 from 'd3'

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
    const hist   = state.history.toJS()
    const lookup = d => hist[d]
    const cmp    = (a, b) => lookup(b) - lookup(a)

    const keys = Object.keys(hist).sort(cmp)
    const vals = keys.map(lookup)

    //const min    = d3.min(vals)
    const max    = d3.max(vals)
    const mean   = d3.mean(vals)
    //const medium = d3.median(vals)

    const widthScale = d3.scaleLinear()
      .domain([0,max])
      .range([1,100])

    const colorScale = d3.scaleLinear()
      .domain([0, mean, max])
      .range(['red', 'blue', 'green'])
      .interpolate(d3.interpolateHsl)

    var bars = this.root
      .selectAll('.entry')
      .data(keys)

    bars.enter()
      .append('div')
        .attr('class', 'entry')

    bars.exit().remove()

    bars
        .html(x => lookup(x) + ' : ' + x)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .style('color', k => k === state.last.id ? 'red' : 'white')
        .style('background-color', k => colorScale(lookup(k)))
        .ease(d3.easeCircleOut)
        // .style('width', k => widthScale(lookup(k)) + '%')
        .styleTween('width', function (d) {
          const from = this.style.width
          const to   = widthScale(lookup(d)) + '%'
          return d3.interpolateString(from, to)
        })
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
})

export default RelativeBarChartComponent
