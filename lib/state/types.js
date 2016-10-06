'use babel';

import { cond, curry, always, T } from 'ramda';

export const ADD   = 'state/add';
export const RESET = 'state/reset';

export const add = stimulus => ({
  type: ADD,
  stimulus,
});

export const reset = () => ({
  type: RESET,
});

export const typeEq = curry((type, action) => type === action.type);

export const ifTypeIs = (type, fn) => [
  typeEq(type),
  always(fn)
];

export const otherwise = (fn) => [
  T,
  always(fn)
];

export const conditionalReducer = conditions => (state, action) => cond(conditions)(action)(state);

export default {
  add,
  reset
};
