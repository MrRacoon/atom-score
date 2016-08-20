'use babel'


import { score, counter, last, recent } from './state'
import * as stimuli from './behavior/stimuli'
// import * as d3 from 'd3'
import Immutable from 'immutable';
import * as d3 from 'd3'

export const initialScore    = () => score.constants.INITIAL_STATE
export const initialCount    = () => counter.constants.INITIAL_STATE
export const initialLast     = () => ''
export const initialRecent   = () => ''

export const getScore        = state => state.score
export const getCount        = state => state.count
export const commandCount    = stimulus => state => state.history.get(stimulus.id)
export const lastCommandName = state => state.last.combo
export const recentVimString = state => state.recent.take(20).map(s => s.combo).toJS().join('')

export const predictorToMap  = state => {
  return !state.predictor ? {} : state.predictor.toJS()
}
export const lastNCommands   = n => state => state.recent.take(n)
export const lastTwoCommands = lastNCommands(1)
export const predict         = (state) => {
  if (!state.recent || state.recent.size < 2) { return }
  const lastStrokes  = lastTwoCommands(state).map(c => c.combo)
  const predictorMap = state.predictor.getIn(lastStrokes, Immutable.Map()).toJS()
  const keys = Object.keys(predictorMap)
  const vals = keys.map(k => predictorMap[k])
  const acc  = keys.reduce((max, key) => (predictorMap[max] || 0) > predictorMap[key] ? max : key, '')
  return acc
}

export const lookupStimulus  = id => stimuli.lookup(id)
export const stimulusCommand = id => (lookupStimulus(id) || {}).command
