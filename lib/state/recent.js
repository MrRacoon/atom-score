'use babel';

import Immutable from 'immutable';
import types from './types';

const NAME = 'recent';
const INITIAL_STATE = Immutable.List();
const MAX_AT_A_TIME = 20;

const reducer = (state, action) => {
  switch (action.type) {
  case types.ADD:
    return Object.assign({}, state, {
      [NAME]: state.recent.unshift(action.stimulus).take(MAX_AT_A_TIME)
    });
  case types.RESET:
    return Object.assign({}, state, {
      [NAME]: INITIAL_STATE
    });
  default: return state;
  }
};

const constants = { NAME, INITIAL_STATE };
export default { constants, reducer };
