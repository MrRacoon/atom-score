'use babel';
import Immutable from 'immutable';
import types from './types';

const NAME          = 'predictor';
const INITIAL_STATE = Immutable.Map();

const reducer = (state, action) => {
  state.predictor = state.predictor || INITIAL_STATE;
  switch (action.type) {
  case types.ADD:
    state.predictor = updateMap(state.predictor, state.recent.toJS());
    return state;
  case types.RESET:
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


const constants = { NAME, INITIAL_STATE };
export default { constants, reducer };
