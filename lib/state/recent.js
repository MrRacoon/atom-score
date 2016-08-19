'use babel'

import Immutable from 'immutable'

const NAME = 'recent'
const INITIAL_STATE = Immutable.List()

const ADD = 'recent/add'

const add = stimulus => ({
  type: ADD,
  stimulus
})

const reducer = (state, action) => {
  state.recent = state.recent || INITIAL_STATE
  if (action.type === ADD) {
    state.recent = state.recent
      .unshift(action.stimulus)
      .take(20)
  }
  return state
}

const constants = { NAME, INITIAL_STATE }
const types     = { ADD }
const actions   = { add }
export default { constants, types, actions, reducer }
