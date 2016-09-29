'use babel';

import { ADD, RESET } from './types';

export const NAME = 'count';
export const INITIAL_STATE = 0;

export const reducer = (state, msg) => {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (msg.type) {
  case ADD:
    return Object.assign({}, state, { [NAME]: state[NAME] + 1 });
  case RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
};

export default { NAME, INITIAL_STATE, reducer };
