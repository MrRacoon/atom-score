'use babel';

import { ADD, RESET } from './types';
import P, { define, log, modify, remove } from 'partial.lenses';
import { prop, apply, inc, map, take, last, init } from 'ramda';

export const NAME           = 'predictor';
export const INITIAL_STATE  = {};
export const LEARNING_DEPTH = 3;

const lens = { [NAME]: {}};
lens[NAME].base = P(
  define({}),
    NAME,
    define({}),
    log(NAME)
);

lens[NAME].mid = l => P(
    l,
    define({})
);

lens[NAME].term = l => P(
    l,
    define(0)
);

lens[NAME].lastObj = lst => P(
  lens[NAME].base,
  apply(P, map(lens[NAME].mid, init(lst))),
  log('guesses')
);

lens[NAME].tab = lst =>
  lens[NAME].lastObj(take(LEARNING_DEPTH, map(prop('id'), lst)));

lens[NAME].entry = lst => P(
  lens[NAME].lastObj(lst),
  lens[NAME].term(last(lst))
);

const updateMap = (path, state) => {
  if (path.length < LEARNING_DEPTH) { return state; }
  const args = take(LEARNING_DEPTH, map(prop('id'), path));
  return modify(lens[NAME].entry(args), inc, state);
};

const reset = remove(lens[NAME].base);

export const reducer = (state, action) => {
  switch (action.type) {
  case ADD   : return updateMap(state.recent, state);
  case RESET : return reset(state);
  default    : return state;
  }
};

export default { NAME, INITIAL_STATE, reducer, lens };
