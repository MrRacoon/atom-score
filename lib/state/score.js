'use babel';

import { ADD, RESET } from './types';

export const NAME = 'score';
export const INITIAL_STATE = 0;

export function reducer (state, action) {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (action.type) {
  case ADD:
    return Object.assign({}, state, {
      [NAME] : (state[NAME] || 0) + action.stimulus.points
    });
  case RESET:
    return Object.assign({}, state, {
      [NAME] : INITIAL_STATE
    });
  default:
    return state;
  }
}

export default { NAME, INITIAL_STATE, reducer };
