'use babel'

export const apmAt    = amount => current => current.apm   >   amount

export const scoreEq  = amount => current => current.score === amount

export const keyCombo = combo  => current => {
  const keys = current.commandString
    .slice(0, combo.length)
    .reverse()
    .join('')
  return keys === combo.join('')
}

export const cumulativeGroupCount = group => current => {
  const rate      = 10
  const triggered = group.includes(current.command)
  const count     = current.history[current.command]
  return triggered && (count % rate === 0)
}


export const achievements = [
  {
    title: 'over 100!',
    description: "Get those fingers moving",
    score: 10,
    criteria: apmAt(100)
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

}
