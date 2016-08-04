'use babel';

export default class VimScoreToolbar {

  constructor (state = {}) {
    // Constants
    this.TILE_PRIORITY = 100

    // State
    this.state = state
  }

  serialize() {
    return {
      isShown: this.state.isShown
    }
  }

  destroy() {
    this.tile.remove()
  }

  // ===========================================================================

  addTile (statusBar) {
    this.tile = document.createElement('div')
    this.tile.textContent = 'vimScore' // TODO : init
    this.tile.classList.add('inline-block')
    this.tile.classList.add('vim-score-tile')
    statusBar.addLeftTile({
      item: this.tile,
      priority: this.TILE_PRIORITY
    })

    if (!this.state.isShown) { this.tile.classList.add('hide') }

  }

  toggle() {
    return this.state.isShown = !this.tile.classList.toggle('hide')
  }

  setScore(scoreboard) {
    this.tile.textContent = `${scoreboard.score}:pts ${scoreboard.apm}:apm`
  }
}
