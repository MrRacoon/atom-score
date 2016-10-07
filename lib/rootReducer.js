'use babel';

import { combineReducers } from 'redux';

import { score, counter, last, recent } from './state';

export const INITIAL_STATE = {
  [score.NAME]   : score.INITIAL_STATE,
  [counter.NAME] : counter.INITIAL_STATE,
  [last.NAME]    : last.INITIAL_STATE,
  [recent.NAME]    : recent.INITIAL_STATE,
  // [history.NAME]   : history.INITIAL_STATE,
  // [predictor.NAME] : predictor.INITIAL_STATE,
};

const reducers = [
  score.reducer,
  counter.reducer,
  last.reducer,
  recent.reducer,
  // history.reducer,
  // predictor.reducer,
];

export const combined = combineReducers({
  [score.NAME]   : score.reducer,
  [counter.NAME] : counter.reducer,
  // [history.NAME] : history.reducer,
});

const composed = (initState = INITIAL_STATE, action) =>
  reducers.reduce((prevState, reducr) => reducr(prevState, action), initState);

export default composed;
