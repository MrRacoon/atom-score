'use babel'

// Constants
const NAME = 'history'
const INITIAL_STATE = {}

export const constants = { NAME, INITIAL_STATE }

// Actions
const increment = stimulus => ({
  type: 'history/increment',
  stimulus
})

export const actions = { increment }

export default function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
  case INCREMENT: return Object.assign({}, state, {
    [action.stimulus.id]: (state[action.stimulus.id] || 0) + 1
  })
  default: return state
  }
}
