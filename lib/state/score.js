'use babel'

import types from './types';

const NAME = 'score'
const INITIAL_STATE = 0

export function reducer (state, action) {
  state.score = state.score || INITIAL_STATE
  switch (action.type) {
  case types.ADD:
    return Object.assign({}, state, {
      [NAME] : (state[NAME] || 0) + action.stimulus.points
    })
  case types.RESET:
    return Object.assign({}, state, {
      [NAME] : INITIAL_STATE
    })
  default:
    return state
  }
}

export const constants = { NAME, INITIAL_STATE }
export default { constants, reducer }
