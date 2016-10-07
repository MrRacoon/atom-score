'use babel';

import { ADD, RESET } from './types';
import P, { define, remove, set, modify, log } from 'partial.lenses';
import { curry, identity } from 'ramda';

export const NAME          = 'last';
export const INITIAL_STATE = {};

const lens = {
  [NAME]: P(
    define({}),
    NAME,
    define(INITIAL_STATE),
    log(NAME)
  ),
};

const become = curry((action, state) => set(lens[NAME], action.payload, state));
const reset  = remove(lens[NAME]);
const touch  = modify(lens[NAME], identity);

export function reducer (state, action) {
  switch (action.type) {
  case ADD   : return become(action, state);
  case RESET : return reset(state);
  default    : return touch(state);
  }
}

export default { NAME, INITIAL_STATE, reducer, lens };
