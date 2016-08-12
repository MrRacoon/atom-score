'use babel'

import { success, info, warning } from './atom-score-notifier'
import { apmEq, scoreEq, cumulativeGroupCount, keyCombo, cumulativeGroupRate } from './atom-score-achievement-criteria'

class Achievement {
  constructor(title, description, score, criteria) {
    Object.assign(this, { title, description, score, criteria })
  }
}

export const achievements = [
  new Achievement(
    'over 100!',
    'your fingres are like little worms desperately foraging for nutrients',
    10,
    apmEq(100)
  ),
  new Achievement(
    'Stop being bad at moving',
    'Stop using `hjkl` to navigate',
    -10,
    cumulativeGroupRate(10, [
      'vim-mode:move-up',
      'vim-mode:move-down',
      'vim-mode:move-left',
      'vim-mode:move-right'
    ])
  ),
  new Achievement(
    'feeling the dept',
    'You have got to watch those points man..',
    0,
    scoreEq(-1000)
  ),
  new Achievement(
    'Cheap trick',
    'Use `Shift + L` instead',
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
