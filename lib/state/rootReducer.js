'use babel'

import { combineReducers } from 'redux'
import score from './score'
import history from './history'

export default combineReducers({
  [history.constants.NAME] : history.reducer,
  [score.constants.NAME]   : score.reducer
})
