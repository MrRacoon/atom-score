'use babel'

import { success, info, warning } from './atom-score-notifier'

export const achievements = [
  {
    title: 'over 100!',
    description: "Get those fingers moving",
    score: 10,
    criteria: apmEq(100)
  },
  {
    title: 'Movement',
    description: "Try to use less primitive movement",
    score: -10,
    criteria: cumulativeGroupCount([
      'vim-mode:move-up',
      'vim-mode:move-down',
      'vim-mode:move-left',
      'vim-mode:move-right'
    ])
  },
  {
    title: 'Feeling the dept',
    description: "Your points are getting too Low!",
    score: 0, // otherwise we might get stuck
    criteria: scoreEq(-1000)
  },
  {
    title: 'End of the line',
    description: "Find a better way to jump to the end of the line",
    score: -20, // otherwise we might get stuck
    criteria: keyCombo(['A', '^e'])
  }
]

class Achievement {
  constructor(title, description, score, criteria) {
    this.title       = title
    this.description = description
    this.score       = score
    this.criteria    = criteria
  }
}

export default class AtomScoreAchiever {
  constructor(state = {}) {
    this.history = state.history || []
  }

  check(scoreboard) {
    const current = achievements.filter(ach => ach.criteria(scoreboard))
    const newer   = current.filter(ach => !this.history.find(oldAch => oldAch === ach))
    this.history  = current
    return newer
  }

  notify(ach) {
    const func = ach.score > 0 ? success : ach.score < 0 ? warning : info
    func(ach.title, ach.description)
  }
}
