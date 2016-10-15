'use babel';

import {
  // select,
  // easeCircleOut,
  easeLinear,
} from 'd3';

export const TRANSITION_DELAY = 0;
export const TRANSITION_DURATION = 500;
export const TRANSITION_EASE = easeLinear;
export const STARTING_HEIGHT = 200;

export const topScale = (d, i) =>
  `${STARTING_HEIGHT + (i*20)}px`;

export const itemText = item =>
  `lvl.${item.level} ${item.wear} ${item.enhance} ${item.name} (${item.type})`;


export const itemColor = (d) => {
  switch (d.wear) {
  case 'basic'    : return 'green';
  case 'common'   : return 'blue';
  case 'prestine' : return 'purple';
  case 'powerful' : return 'yellow';
  case 'super'    : return 'orange';
  case 'thorged'  : return 'red';
  default         : return 'white';
  }
};

export const tip =
  elem => elem
    .append('div')
    .attr('class', 'atom-score-tool-tip');


export const tipHtml = d => `
<div class="tool-tip-contents">
  <h3 class="tool-tip-title">${d.wear} ${d.name}</h3>
  <div class="tool-tip-detail"><b>Type</b>: ${d.type}</div>
  <div class="tool-tip-detail"><b>Level</b>: ${d.level}</div>
  <div class="tool-tip-detail"><b>Origins</b>: ${d.origin}</div>
  <div class="tool-tip-detail"><b>Augments</b>: ${d.enhance}</div>
  <div class="tool-tip-detail"><b>Resists</b>: ${d.resist}</div>
</div>
`;

export const tipShow = d => elem =>
  elem
    .html(tipHtml(d))
      .transition()
      .duration(200)
        .style('font-size', '12px')
        .style('width', '300px')
        .style('height', '200px')
        .style('left', '-320px');

export const tipHide = () => elem =>
  elem
    .transition()
    .delay(1000)
    .duration(200)
      .style('font-size', '0px')
      .style('width', '0px')
      .style('height', '0px')
      .style('left', '0px');
