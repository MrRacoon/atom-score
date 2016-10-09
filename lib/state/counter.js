'use babel';

import { inc } from 'ramda';
import { ADD, RESET } from './types';

export const NAME = 'count';
export const INITIAL_STATE = 0;

export const reducer = (state, action) => {
  state[NAME] = state[NAME] || INITIAL_STATE;

  switch (action.type) {
  case ADD   : return Object.assign({}, state, {
    [NAME]: inc(state[NAME]),
  });
  case RESET   : return Object.assign({}, state, {
    [NAME]: INITIAL_STATE,
  });
  default    : return state;
  }
};

export default { NAME, INITIAL_STATE, reducer };
