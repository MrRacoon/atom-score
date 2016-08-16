'use babel'

const NAME = 'score'
const INITIAL_VALUE = 0

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

function reducer (state, action) {
  state = state || INITIAL_VALUE
  switch (action.type) {
    case ADD      : return state += action.amount
    case SUBTRACT : return state -= action.amount
    case SET      : return action.amount
    default       : state
  }
}

export const constants = { NAME, INITIAL_VALUE }
export const actions = { add, subtract, set }
export const reducer
export default { constants, actions, reducer }
