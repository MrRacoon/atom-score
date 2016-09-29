'use babel';

export const ADD   = 'state/add';
export const RESET = 'state/reset';

export const add = stimulus => ({
  type: ADD,
  stimulus,
});

export const reset = () => ({
  type: RESET,
});

export default {
  add,
  reset
};
