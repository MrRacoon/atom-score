'use babel';

import {
  easeLinear,
  select,
} from 'd3';

export const TRANSITION_DELAY = 0;
export const TRANSITION_DURATION = 500;
export const TRANSITION_EASE = easeLinear;
export const STARTING_HEIGHT = 200;

export const topScale = (d, i) =>
  `${STARTING_HEIGHT + (i*20)}px`;

export const itemText = item =>
  `lvl.${item.level} ${item.wear} ${item.name} (${item.type})`;


export const itemColor = () => 'white';
  // switch (d.wear) {
  // case 'basic'    : return 'green';
  // case 'common'   : return 'blue';
  // case 'prestine' : return 'purple';
  // case 'powerful' : return 'yellow';
  // case 'super'    : return 'orange';
  // case 'thorged'  : return 'red';
  // default         : return 'white';
  // }

export const tip =
  elem => elem
    .append('div')
    .attr('class', 'atom-score-tool-tip');

export const tipHtml = d => `
<div class="tool-tip-contents">
  <span class="tool-tip-label label label-primary">lvl.${d.level}</span>
  <span class="tool-tip-label label label-danger">${d.type}</span>
  <h1 class="tool-tip-title ${d.wear}">${d.wear} ${d.name}</h1>
  <img class="tool-tip-icon ${d.wear}" src="atom://atom-score/icons/${d.icon}.png"></img>
  <div class="tool-tip-detail"><h2>Origins</h2>${d.origin}</div>
  <div class="tool-tip-detail"><h2>Description</h2></div>
  <p class="tool-tip-description">${d.description}</p>
  <div class="tool-tip-detail"><h2>Traits:</h2></div>
  ${d.traits.map(t =>
    `<p class="tool-tip-trait"><b>${t.name}:</b> ${t.desc}</p>`
  ).join('\n')}
</div>
`;

export const tipShow = d => elem => {
  select('.tool-tip-icon')
    .transition()
    .duration(200)
      .style('height', '64px')
      .style('width', '64px');

  elem
    .html(tipHtml(d))
      .transition()
      .duration(200)
        .style('font-size', '12px')
        .style('width', '300px')
        .style('height', '700px')
        .style('left', '-320px');
};


export const tipHide = () => elem => {
  select('.tool-tip-icon')
    .transition()
    .delay(1000)
    .duration(200)
      .style('height', '0px')
      .style('width', '0px');

  elem
    .transition()
    .delay(1000)
    .duration(200)
      .style('font-size', '0px')
      .style('width', '0px')
      .style('height', '0px')
      .style('left', '0px');

};
