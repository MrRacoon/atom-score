'use babel';

const ADD   = 'state/add';
const RESET = 'state/reset';

const add = stimulus => ({
  type: ADD,
  stimulus,
});

const reset = () => ({
  type: RESET,
});

const actions = { add, reset };


export default { ADD, RESET, actions };
