'use babel'

const apmAt = n => score => score.apm > 100

const cumulativeGroupCount = group => score => {
  console.log(count)
  const rate      = 10
  const triggered = group.includes(score.command)
  const count     = score.history[score.command]
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
    title: 'too much up',
    description: "Your hitting ",
    score: -10,
    criteria: (score) => cumulativeGroupCount([
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
    criteria: (current) => current.score === -1000
  }
]

export default class AtomScoreAchiever {
  constructor(state = {}) {
    this.history = state.history || []
  }

  check(score) {
    const current = achievements.filter(ach => ach.criteria(score, history))
    const newer   = current.filter(ach => !this.history.find(oldAch => oldAch === ach))
    this.history  = current
    return newer
  }

}
