'use babel'

const NAME = 'score'
const INITIAL_STATE = 0

const ADD      = 'score/add'
const SUBTRACT = 'score/subtract'
const SET      = 'score/set'

const add = amount => ({
  type: ADD,
  amount
})
const subtract = amount => ({
  type: SUBTRACT,
  amount
})
const set = amount => ({
  type: SET,
  amount
})

export function reducer (state, action) {
  state.score = state.score || INITIAL_STATE
  switch (action.type) {

  case ADD: return Object.assign({}, state, {
    [NAME] : state[NAME] + action.amount
  })

  case SUBTRACT: return Object.assign({}, state, {
    [NAME] : state[NAME] - action.amount
  })

  case SET: return Object.assign({}, state, {
    [NAME] : action.amount
  })

  default : return state

  }
}

export const types = { ADD, SUBTRACT, SET }
export const constants = { NAME, INITIAL_STATE }
export const actions = { add, subtract, set }
export default { constants, actions, reducer, types }
