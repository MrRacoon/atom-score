'use babel'

import { Map } from 'immutable'

// Constants
const NAME = 'history'
const INITIAL_STATE = Map()

const INCREMENT = 'history/increment'
const increment = stimulus => ({ type: INCREMENT, stimulus })

export function reducer (state, action) {
  state.history = state.history || INITIAL_STATE
  switch (action.type) {
  case INCREMENT: return Object.assign({}, state, {
    [NAME]: state[NAME].set(action.stimulus.id, state[NAME].get(action.stimulus.id, 0) +1)
  })
  default: return state
  }
}

export const constants = { NAME, INITIAL_STATE }
export const types     = { INCREMENT }
export const actions   = { increment }
export default { constants, actions, types, reducer }
