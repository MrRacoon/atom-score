'use babel'

import Immutable from 'immutable'

class Stimulus {
  constructor({ id, combo, points }) {
    this.id           = id
    this.combo        = combo  || ''
    this.points       = points || 0

    const spl         = id.split(':')
    this.module       = spl[0]  || ''
    this.command      = spl[1] || ''
  }
}

const stimuli = Immutable.List.of(
  //
  // Movevent
  //
  new Stimulus({
    id: 'vim-mode:move-up',
    combo: 'k',
    points: -1,
  }),
  new Stimulus({
    id: 'vim-mode:move-down',
    combo: 'j',
    points: -1,
  }),
  new Stimulus({
    id: 'vim-mode:move-left',
    combo: 'h',
    points: -1,
  }),
  new Stimulus({
    id: 'vim-mode:move-right',
    combo: 'l',
    points: -1,
  }),
  //
  // Jump by word
  //
  new Stimulus({
    id: 'vim-mode:move-to-next-word',
    combo: 'w',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-next-whole-word',
    combo: 'W',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-end-of-word',
    combo: 'e',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-end-of-whole-word',
    combo: 'E',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-previous-word',
    combo: 'b',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-previous-whole-word',
    combo: 'B',
    points: 2,
  }),
  //
  // Scrolling
  //
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-top-leave',
    combo: 'zt',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-middle',
    combo: 'z.',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-middle-leave',
    combo: 'zz',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-bottom',
    combo: 'z-',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-bottom-leave',
    combo: 'zb',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-left',
    combo: 'zs',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-cursor-to-right',
    combo: 'ze',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-start-of-file',
    combo: 'gg',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-half-screen-down',
    combo: '^d',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:scroll-half-screen-up',
    combo: '^u',
    points: 2,
  }),
  //
  // Jumping
  //
  new Stimulus({
    id: 'vim-mode:till',
    combo: 't',
    points: 3,
  }),
  new Stimulus({
    id: 'vim-mode:till-backwards',
    combo: 'T',
    points: 3,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-line',
    combo: 'g',
    points: 3,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-end-of-line',
    combo: 'L',
    points: 3,
  }),
  new Stimulus({
    id: 'vim-mode:move-to-beginning-of-line',
    combo: 'H',
    points: 3,
  }),
  //
  // Inserting
  //
  new Stimulus({
    id: 'vim-mode:insert-after-end-of-line',
    combo: 'A',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:insert-after',
    combo: 'a',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:activate-insert-mode',
    combo: 'i',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:insert-at-beginning-of-line',
    combo: 'I',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:insert-below-with-newline',
    combo: 'o',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:insert-above-with-newline',
    combo: 'O',
    points: 1,
  }),
  //
  // Searching
  //
  new Stimulus({
    id: 'vim-mode:repeat-search',
    combo: 'n',
    points: 2,
  }),
  new Stimulus({
    id: 'vim-mode:repeat-search-backwards',
    combo: 'N',
    points: 2,
  }),
  //
  // Utility
  //
  new Stimulus({
    id: 'vim-mode:undo',
    combo: 'u',
    points: -2,
  }),
  new Stimulus({
    id: 'core:redo',
    combo: '^r',
    points: -2,
  }),
  new Stimulus({
    id: 'vim-mode:yank',
    combo: 'y',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:reset-normal-mode',
    combo: '^e',
    points: 1,
  }),
  new Stimulus({
    id: 'vim-mode:repeat',
    combo: '.',
    points: 1,
  })
)

export const asMap = stimuli.reduce((obj, cur) => obj.set(cur.id, cur), Immutable.Map())

export const lookup = id => {
  return asMap.get(id)
}

export default stimuli
