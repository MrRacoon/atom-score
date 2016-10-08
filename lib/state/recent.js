'use babel';

import { ADD, RESET, conditionalReducer, ifTypeIs, ifTypeIs_, otherwise } from './types';
import { take, compose, prepend, identity } from 'ramda';
import P, { modify, define, log, remove } from 'partial.lenses';

export const NAME          = 'recent';
export const INITIAL_STATE = [];
export const MAX_AT_A_TIME = 40;

const lens = {
  [NAME]: P(define({}), NAME, define([]), log(NAME)),
};

const update = action => compose(take(MAX_AT_A_TIME), prepend(action.payload));

const add    = compose(modify(lens[NAME]), update);
const reset  = remove(lens[NAME]);
const touch  = modify(lens[NAME], identity);

export const reducer = conditionalReducer([
  ifTypeIs_(ADD  , add  ),
  ifTypeIs (RESET, reset),
  otherwise(       touch)
]);

export default { NAME, INITIAL_STATE, reducer, lens };
