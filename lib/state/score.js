'use babel';

import { ADD, RESET } from './types';
import P, { modify, define, remove, log } from 'partial.lenses';
import { curry, identity } from 'ramda';


export const NAME = 'score';
export const INITIAL_STATE = 0;

const lens = {
  [NAME]: P(
    log(NAME),
    define({}),
    NAME,
    define(INITIAL_STATE)
  ),
};

const add   = curry((action, state) => modify(lens[NAME], n => action.payload.points + n, state));
const reset = remove(lens[NAME]);
const touch = modify(lens[NAME], identity);

export function reducer (state, action) {
  switch (action.type) {
  case ADD   : return add(action, state);
  case RESET : return reset(add);
  default    : return touch(state);
  }
}

export default { NAME, INITIAL_STATE, reducer, lens };
