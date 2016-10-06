'use babel';

import { compose, remove, modify, define } from 'partial.lenses';
import { identity, inc } from 'ramda';
import { ADD, RESET, ifTypeIs, otherwise, conditionalReducer } from './types';

export const NAME = 'count';
export const INITIAL_STATE = 0;

const lens = {
  [NAME]: compose(
    define({}),
    NAME,
    define(INITIAL_STATE)
  ),
};

const reset     = remove(lens[NAME]);
const add       = modify(lens[NAME], inc);
const fallback  = modify(lens[NAME], identity);

export const reducer = conditionalReducer([
  ifTypeIs(ADD, add),
  ifTypeIs(RESET, reset),
  otherwise(fallback)
]);

export default { NAME, INITIAL_STATE, reducer, lens };
