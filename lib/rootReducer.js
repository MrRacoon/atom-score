'use babel'

import { combineReducers } from 'redux'

import { score, history, counter } from './state'

export const combined = combineReducers({
  [history.constants.NAME] : history.reducer,
  [score.constants.NAME]   : score.reducer,
  [counter.constants.NAME] : counter.reducer,

})

export const INITIAL_STATE = {
  [score.constants.NAME]: score.constants.INITIAL_STATE,
  [history.constants.NAME]: history.constants.INITIAL_STATE,
  [counter.constants.NAME] : counter.constants.INITIAL_STATE,
}

const reducers = [
  score.reducer,
  history.reducer,
  counter.reducer
]

const composed = (initialState = INITIAL_STATE, action) =>
  reducers.reduce((recentState, r) => r(recentState, action), initialState)

export default composed
