'use babel'

import { ADD, SET, RESET } from './actionTypes'
import { INITIAL_STATE }   from './constants'

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
    case ADD    : state.unshift(action.stimulus); return state
    case SET    : return action.state
    case RESET  : return INITIAL_STATE
    default     : return state
  }
};
