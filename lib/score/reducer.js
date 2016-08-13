'use babel';

import t from './actionTypes'
import { add, sub, set } from './actions'

export function reducer (state, action) {
  switch (action.type) {
    case t.ADD:
      return state + action.points
    case t.SUBTRACT:
      return state - action.points
    case t.SET:
      return action.points
    case t.RESET:
      return 0
    default:
      return state
  }
}
