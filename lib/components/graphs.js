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
    const bounds = this.root.node().getBoundingClientRect()
    console.log(bounds)
    const maxWidth = bounds.width;
    const hist   = state.history.toJS()
    console.log(hist)
    const lookup = d => hist[d]
    const cmp    = (a, b) => lookup(b) - lookup(a)

    const keys = Object.keys(hist)
    const vals = keys.map(lookup)

    //const min    = d3.min(vals)
    const max    = d3.max(vals)
    const mean   = d3.mean(vals)
    //const medium = d3.median(vals)

    const widthScale = d3.scaleLinear()
      .domain([0,max])
      .range([1,maxWidth])

    const colorScale = d3.scaleLinear()
      .domain([0, mean, max])
      .range(['rgba(255,0,0,0.3)', 'rgba(0,0,255,0.3)', 'rgba(0,255,0,0.3)'])

    var bars = this.root
      .selectAll('.entry')
      .data(keys, x => x)

    bars.enter()
      .append('div')
        .attr('class', 'entry')
        .style('top', '0px')
        //.style('top', (d, i) => (60 + (i*30)) + 'px')

    bars.exit().remove()

    bars.sort((a,b) => d3.descending(lookup(a), lookup(b)))
        .html(x => lookup(x) + ' : ' + x)
        .transition()
          .duration(500)
          .ease(d3.easeBounce)
          .style('color', k => k === state.last.id ? 'red' : 'grey')
          .style('background-color', k => colorScale(lookup(k)))
          .style('top', (d, i) => (60 + (i*30)) + 'px')
          // .styleTween('top', (d, i) => d3.interpolateString(this.style.top, (60 + (i*30)) + 'px' ))
          .styleTween('width', function (d) {
            const from = this.style.width
            const to   = widthScale(lookup(d)) + 'px'
            return d3.interpolateString(from, to)
          })
  }
}

const RelativeBarChartComponent = document.registerElement('atom-score-relative-bar-chart', {
  prototype: Object.create(RelativeBarChart.prototype),
})

export default RelativeBarChartComponent
