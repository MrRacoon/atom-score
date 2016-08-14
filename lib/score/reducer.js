'use babel';

import { ADD, SUBTRACT, SET, RESET } from './actionTypes'
import { INITIAL_STATE } from './constants'
import { add, sub, set } from './actions'

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
    case ADD      : return state + action.points
    case SUBTRACT : return state - action.points
    case SET      : return action.points
    case RESET    : return 0
    default       : return state
  }
}
