'use babel';

import { ADD, RESET } from './types';

export const NAME = 'score';
export const INITIAL_STATE = 0;

export function reducer (state, action) {
  switch (action.type) {
  case ADD   : return { ...state, [NAME]: state[NAME] + action.payload.points };
  case RESET : return { ...state, [NAME]: INITIAL_STATE };
  default    : return state;
  }
}

export default { NAME, INITIAL_STATE, reducer };
