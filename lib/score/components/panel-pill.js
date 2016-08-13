'use babel'
export default class ScorePill extends HTMLElement {
  constructor() {
    super()
    this.classList.add('.score-panel-pill')

    this.scoreKey = document.createElement('span')
    this.scoreKey.textContent = 'score'
  }

  set (n = 0) {
    this.scoreKey.textContext = `score ${n}`
  }
}
