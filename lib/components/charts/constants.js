'use babel';

import { select, easeCircleOut } from 'd3';

export const TRANSITION_DELAY = 0;
export const TRANSITION_DURATION = 500;
export const TRANSITION_EASE = easeCircleOut;
export const STARTING_HEIGHT = 200;

export const topScale = (d, i) =>
  `${STARTING_HEIGHT + (i*20)}px`;

export const itemText = item =>
  `lvl.${item.level} ${item.wear} ${item.enhance} ${item.name} (${item.type})`;

export function itemHover() {
  select(this)
    .style('opacity', 0.5);
}

export function itemUnHover() {
  select(this)
    .style('opacity', 1);
}
