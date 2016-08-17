'use babel'

export const getScore     = state => state.score
export const getCount     = state => state.count
export const commandCount = stimulus => state => state.history.get(stimulus.id)
