'use babel';

import { combineReducers } from 'redux'
import score   from './score'
import counter from './counter'

export default combineReducers({
  [score.constants.NAME]   : score.reducer,
  [counter.constants.NAME] : counter.reducer
})
