'use babel'

import { success, info, warning } from './atom-score-notifier'
import { apmEq, scoreEq, cumulativeGroupCount, keyCombo } from './atom-score-achievement-criteria'

class Achievement {
  constructor(title, description, score, criteria) {
    Object.assign(this, { title, description, score, criteria })
  }
}

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
    criteria: cumulativeGroupCount(100, [
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
  new Achievement(
    'End of the line',
    'Find a better way to jump around',
    -20,
    keyCombo(['A', '^e'])
  )
]

export default class AtomScoreAchiever {
  constructor(state = {}) {
    this.history = state.history || []
  }

  check(scoreboard) {
    const current = achievements.filter(ach => ach.criteria(scoreboard))
    const newer   = current.filter(ach => this.history.indexOf(ach) === -1)
    this.history  = current
    current.forEach(this.notify)
    return newer
  }

  notify(ach) {
    const func = ach.score > 0 ? success : ach.score < 0 ? warning : info
    func(ach.title, ach.description)
  }
}
