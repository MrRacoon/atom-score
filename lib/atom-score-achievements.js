'use babel'

export const achievements = [
  {
    title: 'over 100!',
    description: "Get those fingers moving",
    score: 10,
    criteria: (current, history) => current.apm > 100
  },
  {
    title: 'too much up',
    description: "Hey, quit hitting 'k' okay?",
    score: -10,
    criteria: (current, history) => {
      console.log(history)
      const command = 'vim-mode:move-up'
      if (current.command === command) {
        return !(history[command] % 10)
      }
    }
  },
  {
    title: 'Feeling the dept',
    description: "You're sinking, and you should start paying attention",
    score: 0, // otherwise we might get stuck
    criteria: (current, history) => current.score === -1000
  }
]

export default class AtomScoreAchiever {
  constructor(state = {}) {
    this.history = state.history || []
  }

  check(score, history) {
    const current = achievements.filter(ach => ach.criteria(score, history))
    const newer   = current.filter(ach => !this.history.find(oldAch => oldAch === ach))
    this.history  = current
    return newer
  }

}
