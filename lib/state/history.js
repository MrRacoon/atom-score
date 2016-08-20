'use babel';

import { Map } from 'immutable';
import types from './types';

// Constants
const NAME = 'history';
const INITIAL_STATE = Map();

export const constants = { NAME, INITIAL_STATE };

export function reducer (state, action) {
  state.history = state.history || INITIAL_STATE;
  switch (action.type) {
  case types.ADD:
    return Object.assign({}, state, {
      [NAME]: state[NAME].set(action.stimulus.id, state[NAME].get(action.stimulus.id, 0) +1)
    });
  case types.RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
}

export default { constants, reducer };
