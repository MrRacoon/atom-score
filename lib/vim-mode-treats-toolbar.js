'use babel';

export default class VimModeTreatsToolbar {

  constructor (serializedState) {
    this.TILE_PRIORITY = 100
  },

  serialize() { },

  destroy() {
    this.tile.remove()
  },

  addTile (statusBar) {
    this.tile = document.createElement('div')
    this.tile.classList.add('inline-block')
    this.tile.classList.add('vim-treats-tile')
    statusBar.addLeftTile({
      item: this.tile,
      priority: this.TILE_PRIORITY
    })
  },

  toggle(force) {
    this.isShownState = this.tile.classList.togle('hide', force)
  }

}
