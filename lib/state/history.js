'use babel'

// Constants
const NAME = 'history'
const INITIAL_STATE = {}


const INCREMENT = 'history/increment'
const increment = stimulus => ({
  type: INCREMENT,
  stimulus
})


export function reducer (state, action) {
  state = state || INITIAL_STATE
  switch (action.type) {
  case INCREMENT: return Object.assign({}, state, {
    [action.stimulus.id]: (state[action.stimulus.id] || 0) + 1
  })
  default: return state
  }
}

export const constants = { NAME, INITIAL_STATE }
export const actions = { increment }
export default { constants, actions, reducer }
