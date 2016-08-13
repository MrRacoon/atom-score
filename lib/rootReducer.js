'use babel';

import { combineReducers } from 'redux'
import score from './score'

export default combineReducers({
  score: score.reducer
})
