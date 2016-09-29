'use babel';

import { Map } from 'immutable';
import { ADD, RESET } from './types';

// Constants
export const NAME = 'history';
export const INITIAL_STATE = Map();

export function reducer (state, action) {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (action.type) {
  case ADD:
    return Object.assign({}, state, {
      [NAME]: state[NAME].set(action.stimulus.id, state[NAME].get(action.stimulus.id, 0) +1)
    });
  case RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
}

export default { NAME, INITIAL_STATE, reducer };
