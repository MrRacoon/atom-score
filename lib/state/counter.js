'use babel';

import { compose, remove, modify, define } from 'partial.lenses';
import { propOr, identity, inc } from 'ramda';
import { ADD, RESET } from './types';

export const NAME = 'count';
export const INITIAL_STATE = 0;

const lens = {
  [NAME]: compose(
    define({}),
    NAME,
    define(INITIAL_STATE)
  ),
};

const defaultFn = modify(lens[NAME], identity);

export const reducer = (state, { type }) => {
  return (propOr(defaultFn, type, {
    [ADD]   : modify(lens[NAME], inc),
    [RESET] : remove(lens[NAME]),
  }))(state);
};

export default { NAME, INITIAL_STATE, reducer, lens };
