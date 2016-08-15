'use babel'


const stimuli = [
  //
  // Movevent
  //
  {
    id: 'vim-mode:move-up',
    combo: 'k'
  },
  {
    id: 'vim-mode:move-down',
    combo: 'j'
  },
  {
    id: 'vim-mode:move-left',
    combo: 'h'
  },
  {
    id: 'vim-mode:move-right',
    combo: 'l'
  },
  //
  // Jump by word
  //
  {
    id: 'vim-mode:move-to-next-word',
    combo: 'w'
  },
  {
    id: 'vim-mode:move-to-next-whole-word',
    combo: 'W'
  },
  {
    id: 'vim-mode:move-to-end-of-word',
    combo: 'e'
  },
  {
    id: 'vim-mode:move-to-end-of-whole-word',
    combo: 'E'
  },
  {
    id: 'vim-mode:move-to-previous-word',
    combo: 'b'
  },
  {
    id: 'vim-mode:move-to-previous-whole-word',
    combo: 'B'
  },
  //
  // Scrolling
  //
  {
    id: 'vim-mode:scroll-cursor-to-top-leave',
    combo: 'zt'
  },
  {
    id: 'vim-mode:scroll-cursor-to-middle',
    combo: 'z.'
  },
  {
    id: 'vim-mode:scroll-cursor-to-middle-leave',
    combo: 'zz'
  },
  {
    id: 'vim-mode:scroll-cursor-to-bottom',
    combo: 'z-'
  },
  {
    id: 'vim-mode:scroll-cursor-to-bottom-leave',
    combo: 'zb'
  },
  {
    id: 'vim-mode:scroll-cursor-to-left',
    combo: 'zs'
  },
  {
    id: 'vim-mode:scroll-cursor-to-right',
    combo: 'ze'
  },
  {
    id: 'vim-mode:move-to-start-of-file',
    combo: 'gg'
  },
  {
    id: 'vim-mode:scroll-half-screen-down',
    combo: '^d'
  },
  {
    id: 'vim-mode:scroll-half-screen-up',
    combo: '^u'
  },
  //
  // Jumping
  //
  {
    id: 'vim-mode:till',
    combo: 't'
  },
  {
    id: 'vim-mode:till-backwards',
    combo: 'T'
  },
  {
    id: 'vim-mode:move-to-line',
    combo: 'g'
  },
  {
    id: 'vim-mode:move-to-end-of-line',
    combo: 'L'
  },
  {
    id: 'vim-mode:move-to-beginning-of-line',
    combo: 'H'
  },
  //
  // Inserting
  //
  {
    id: 'vim-mode:insert-after-end-of-line',
    combo: 'A'
  },
  {
    id: 'vim-mode:insert-after',
    combo: 'a'
  },
  {
    id: 'vim-mode:activate-insert-mode',
    combo: 'i'
  },
  {
    id: 'vim-mode:insert-at-beginning-of-line',
    combo: 'I'
  },
  {
    id: 'vim-mode:insert-below-with-newline',
    combo: 'o'
  },
  {
    id: 'vim-mode:insert-above-with-newline',
    combo: 'O'
  },
  //
  // Searching
  //
  {
    id: 'vim-mode:repeat-search',
    combo: 'n'
  },
  {
    id: 'vim-mode:repeat-search-backwards',
    combo: 'N'
  },
  //
  // Utility
  //
  {
    id: 'vim-mode:undo',
    combo: 'u'
  },
  {
    id: 'core:redo',
    combo: '^r'
  },
  {
    id: 'vim-mode:yank',
    combo: 'y'
  },
  {
    id: 'vim-mode:reset-normal-mode',
    combo: '^e'
  },
  {
    id: 'vim-mode:repeat',
    combo: '.'
  }
]

export default stimuli
