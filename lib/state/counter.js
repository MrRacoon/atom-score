'use babel';

import P, { remove, modify, define, log } from 'partial.lenses';
import { identity, inc } from 'ramda';
import { ADD, RESET, ifTypeIs, otherwise, conditionalReducer } from './types';

export const NAME          = 'count';
export const INITIAL_STATE = 0;

const lens = {
  [NAME]: P(
    define({}),
      NAME,
        define(INITIAL_STATE),
        log(NAME))
};

const reset = remove(lens[NAME]);
const add   = modify(lens[NAME], inc);
const touch = modify(lens[NAME], identity);

export const reducer = conditionalReducer([
  ifTypeIs  ( ADD  , add   ),
  ifTypeIs  ( RESET, reset ),
  otherwise (        touch )
]);

export default { NAME, INITIAL_STATE, reducer, lens };
