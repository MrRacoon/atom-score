'use babel';

import Immutable from 'immutable';
import { ADD, RESET } from './types';

export const NAME = 'recent';
export const INITIAL_STATE = Immutable.List();
export const MAX_AT_A_TIME = 20;

export const reducer = (state, action) => {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (action.type) {
  case ADD:
    return Object.assign({}, state, {
      [NAME]: state.recent.unshift(action.stimulus).take(MAX_AT_A_TIME)
    });
  case RESET:
    return Object.assign({}, state, {
      [NAME]: INITIAL_STATE
    });
  default: return state;
  }
};

export default { NAME, INITIAL_STATE, reducer };
