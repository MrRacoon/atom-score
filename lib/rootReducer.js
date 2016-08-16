'use babel'

import { combineReducers } from 'redux'
import { score, history } from './state'

export default combineReducers({
  [history.constants.NAME] : history.reducer,
  [score.constants.NAME]   : score.reducer
})
