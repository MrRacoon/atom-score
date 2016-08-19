'use babel'

import Immutable from 'immutable'

const NAME = 'recent'
const INITIAL_STATE = Immutable.List()
const MAX_AT_A_TIME = 20

const ADD = 'recent/add'

const add = stimulus => ({
  type: ADD,
  stimulus
})

const reducer = (state, action) => {
  state.recent = state.recent || _.List()
  if (action.type === ADD) {
    state.recent = state.recent
      .unshift(action.stimulus)
      .take(MAX_AT_A_TIME)
  }
  return state
}

const constants = { NAME, INITIAL_STATE }
const types     = { ADD }
const actions   = { add }
export default { constants, types, actions, reducer }
