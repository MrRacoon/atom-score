'use babel'

import * as d3 from 'd3'

console.log(d3)
export function barGraph (state) {
  const root = d3.select('.bar-chart').append('div')

  var bars = root.selectAll('.title')
    .data(state.history)

  // bars.enter().append('div').attr('color', 'green').text('asdfasdf')

  // bars.exit().remove()

  // bars.transition().attr('color', 'red')
}
