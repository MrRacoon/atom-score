'use babel';

import types from './types';

const NAME = 'last';
const INITIAL_STATE = {};

function reducer (state, action) {
  state.last = state.last || INITIAL_STATE;
  switch (action.type) {
  case types.ADD:
    return Object.assign({}, state, { [NAME]: action.stimulus });
  case types.RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
}

const constants = { NAME, INITIAL_STATE };
export default { constants, reducer };
