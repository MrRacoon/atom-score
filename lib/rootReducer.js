'use babel';

import { combineReducers } from 'redux'

import counter from './counter'
import history from './history';
import last    from './last';
import score   from './score'

export default combineReducers({
  [counter.constants.NAME] : counter.reducer,
  [history.constants.NAME] : history.reducer,
  [last.constants.NAME]    : last.reducer,
  [score.constants.NAME]   : score.reducer
})
