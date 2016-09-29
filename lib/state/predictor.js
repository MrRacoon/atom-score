'use babel';

import Immutable from 'immutable';
import { ADD, RESET } from './types';

export const NAME = 'predictor';
export const INITIAL_STATE = Immutable.Map();

export const reducer = (state, action) => {
  state[NAME] = state[NAME] || INITIAL_STATE;
  switch (action.type) {
  case ADD:
    return Object.assign({}, state, {
      [NAME]: updateMap(state.predictor, state.recent.toJS())
    });
  case RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE });
  default:
    return state;
  }
};

const updateMap = (mapp, [cur, last]) => {
  if (!last) { return; }
  //return mapp.update(prior.combo, Immutable.Map(), m => {
  return mapp.update(last.combo, Immutable.Map(), n => {
    return n.update(cur.combo, 0, n => n+1);
  });
  //})
};


export default { NAME, INITIAL_STATE, reducer };
