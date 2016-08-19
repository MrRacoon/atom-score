'use babel'

import types from './types'

const NAME          = 'count'
const INITIAL_STATE = 0

const constants = { NAME, INITIAL_STATE }

function reducer (state, action) {
  state.count = state.count || INITIAL_STATE
  switch (action.type) {
  case types.ADD:
    return Object.assign({}, state, { [NAME]: state[NAME] + 1 })
  case types.RESET:
    return Object.assign({}, state, { [NAME]: INITIAL_STATE })
  default:
    return state
  }
}

export default    { constants, reducer }
