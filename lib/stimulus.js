'use babel'

export const translateCommand = id => {
  if (stimuli[id]) {
    return new Stimulus(id)
  } else {
    return null
  }
}

export class Stimulus {
  constructor (id) {
    this.id = id
    Object.assign(this, stimuli[id])
  }
}

export const stimuli = {
  'editor:fold-cuurent-row': {
    combo: 'zc'
  },
  'vim-mode:move-up': {
    combo: 'k'
  }
}

/*
export const stimuli = [
  new Stimulus('zo', 'editor:unfold-current-row'        , -2),

  new Stimulus('j' , 'vim-mode:move-down'               , -1),
  new Stimulus('h' , 'vim-mode:move-left'               , -1),
  new Stimulus('l' , 'vim-mode:move-right'              , -1),
  new Stimulus('k' , 'vim-mode:move-up'                 , -1),

  new Stimulus('w' , 'vim-mode:move-to-next-word'       , 2),
  new Stimulus('W' , 'vim-mode:move-to-next-whole-word' , 2),
  new Stimulus('e' , 'vim-mode:move-to-end-of-word'     , 2),
  new Stimulus('E' , 'vim-mode:move-to-end-of-whole-word', 2),
  new Stimulus('b' , 'vim-mode:move-to-previous-word'    , 2),
  new Stimulus('B' , 'vim-mode:move-to-previous-whole-word', 2),

  new Stimulus('zt', 'vim-mode:scroll-cursor-to-top-leave'   , 3),
  new Stimulus('z.', 'vim-mode:scroll-cursor-to-middle'      , 2),
  new Stimulus('zz', 'vim-mode:scroll-cursor-to-middle-leave', 3),
  new Stimulus('z-', 'vim-mode:scroll-cursor-to-bottom'      , 2),
  new Stimulus('zb', 'vim-mode:scroll-cursor-to-bottom-leave', 3),
  new Stimulus('zs', 'vim-mode:scroll-cursor-to-left'        , 2),
  new Stimulus('ze', 'vim-mode:scroll-cursor-to-right'       , 2),

  new Stimulus('t' , 'vim-mode:till'                    , 3),
  new Stimulus('T' , 'vim-mode:till-backwards'          , 3),

  new Stimulus('gg', 'vim-mode:move-to-start-of-file'   , 1),
  new Stimulus('g' , 'vim-mode:move-to-line'            , 1),

  new Stimulus('L' , 'editor:move-to-end-of-line'       , 3),
  new Stimulus('H' , 'editor:move-to-beginning-of-line' , 3),

  new Stimulus('A' , 'vim-mode:insert-after-end-of-line', 1),
  new Stimulus('a' , 'vim-mode:insert-after', 2),

  new Stimulus('i' , 'vim-mode:activate-insert-mode'    , 2),
  new Stimulus('I' , 'vim-mode:insert-at-beginning-of-line', 2),

  new Stimulus('o' , 'vim-mode:insert-below-with-newline', 1),
  new Stimulus('O' , 'vim-mode:insert-above-with-newline', 1),

  new Stimulus('n' , 'vim-mode:repeat-search'           , 3),
  new Stimulus('N' , 'vim-mode:repeat-search-backwards' , 3),

  new Stimulus('^d', 'vim-mode:scroll-half-screen-down' , 3),
  new Stimulus('^u', 'vim-mode:scroll-half-screen-up'   , 3),

  new Stimulus('u' , 'vim-mode:undo'                    , -5),
  new Stimulus('^r' , 'core:redo'                       , -5),
  new Stimulus('y' , 'vim-mode:yank'                    , 1),

  new Stimulus('^e', 'vim-mode:reset-normal-mode'       , 1),
  new Stimulus('.' , 'vim-mode:repeat'                  , 2),

  // Ex-mode doesn't call commands, does it raw
  //new Stimulus(':w', 'core:save'                        , 1),
  //new Stimulus(':w', 'pane:save-items'                  , 1),
  //new Stimulus(':w', 'window:save-all'                  , 1),

  // Git Plus
  new Stimulus(',gi=', 'git-plus:add-all-commit-and-push', 10),
]

// export const sample = () => rules[Math.floor(Math.random() * rules.length)]

*/
