'use babel';

import { combineReducers } from 'redux';

import { score, history, counter, last, recent, predictor } from './state';

export const INITIAL_STATE = {
  [score.NAME]     : score.INITIAL_STATE,
  [history.NAME]   : history.INITIAL_STATE,
  [counter.NAME]   : counter.INITIAL_STATE,
  [last.NAME]      : last.INITIAL_STATE,
  [recent.NAME]    : recent.INITIAL_STATE,
  [predictor.NAME] : predictor.INITIAL_STATE,
};

const reducers = [
  last.reducer,
  recent.reducer,
  score.reducer,
  history.reducer,
  counter.reducer,
  predictor.reducer,
];

export const combined = combineReducers({
  [history.NAME] : history.reducer,
  [score.NAME]   : score.reducer,
  [counter.NAME] : counter.reducer,
});

const composed = (initialState = INITIAL_STATE, action) =>
  reducers.reduce((recentState, r) => r(recentState, action), initialState);

export default composed;
