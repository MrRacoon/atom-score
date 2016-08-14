'use babel'

import { ADD, SET, RESET } from './actionTypes'
import { INITIAL_STATE, MAX_LENGTH }   from './constants'


export const cleanState = state => {
  
  if (state.length >== MAX_LENGTH) {

    state = state.slice(0, MAX_LENGTH+1)

  }

  return state
}

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
    case ADD    : state.unshift(action.stimulus); return cleanState(state)
    case SET    : return cleanState(action.state)
    case RESET  : return INITIAL_STATE
    default     : return state
  }
};
