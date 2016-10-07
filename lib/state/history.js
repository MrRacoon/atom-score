'use babel';

import { ADD, RESET } from './types';
import P, { define, defaults, log, modify, remove } from 'partial.lenses';
import { inc, identity } from 'ramda';

// Constants
export const NAME          = 'history';
export const INITIAL_STATE = {};
export const INITIAL_VALUE = 0;

const lens = {};

lens.base = P(
  define({}),
    NAME,
    define({}),
    log(NAME)
);

lens[NAME] = id => P(
  lens.base,
    id,
    defaults(INITIAL_VALUE)
);

const add   = (action, state) => modify(lens[NAME](action), inc, state);
const reset = remove(lens.base);
const touch = modify(lens.base, identity);

export function reducer (state, action) {
  switch (action.type) {
  case ADD   : return add(action.payload.id, state);
  case RESET : return reset(state);
  default    : return touch(state);
  }
}

export default { NAME, INITIAL_STATE, reducer, lens };
