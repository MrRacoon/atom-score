'use babel'


import { score, counter, last, recent } from './state'

export const initialScore    = () => score.constants.INITIAL_STATE
export const initialCount    = () => counter.constants.INITIAL_STATE
export const initialLast     = () => ''
export const initialRecent   = () => ''

export const getScore        = state => state.score
export const getCount        = state => state.count
export const commandCount    = stimulus => state => state.history.get(stimulus.id)
export const lastCommandName = state => state.last.combo
export const recentVimString = state => state.recent.take(20).map(s => s.combo).toJS().join('')
