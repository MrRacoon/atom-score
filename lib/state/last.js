'use babel';

import { ADD, RESET } from './types';

export const NAME = 'last';
export const INITIAL_STATE = {};

export function reducer (state, action) {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (action.type) {
  case ADD:
    return Object.assign({}, state, { [NAME]: action.stimulus });
  case RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
}

export default { NAME, INITIAL_STATE, reducer };
