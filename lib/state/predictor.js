'use babel';

import { ADD, RESET } from './types';
import P, { define, log, modify, remove } from 'partial.lenses';
import { prop, apply, inc, map, take, last, init } from 'ramda';

export const NAME           = 'predictor';
export const INITIAL_STATE  = {};
export const LEARNING_DEPTH = 5;

const lens = {};
lens.base = P(
  define({}),
    NAME,
    define({}),
    log(NAME)
);

lens.mid = l => P(
    l,
    define({})
);

lens.term = l => P(
    l,
    define(0)
);

export const lastObj = lst => P(
  lens.base,
  apply(P, map(lens.mid, init(lst))),
  log('guesses')
);

export const entry = lst => P(
  lastObj(lst),
  lens.term(last(lst))
);


const updateMap = (path, state) => {
  if (path.length < LEARNING_DEPTH) { return state; }
  const args = take(LEARNING_DEPTH, path);
  return modify(entry(args), inc, state);
};

const reset = remove(lens.base);

export const reducer = (state, action) => {
  switch (action.type) {
  case ADD   : return updateMap(map(prop('id'), state.recent), state);
  case RESET : return reset(state);
  default    : return state;
  }
};

export default { NAME, INITIAL_STATE, reducer };
