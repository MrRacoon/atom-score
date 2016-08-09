'use babel'

export class Rule {
  constructor(key, command, points) {
    this.key     = key
    this.command = command
    this.points  = points
    this.time    = new Date()
  }


  resetTime() {
    this.time = new Date()
  }
}

export const rules = [
  new Rule('zc', 'editor:fold-current-row'          , 2),
  new Rule('zo', 'editor:unfold-current-row'        , -2),

  new Rule('j' , 'vim-mode:move-down'               , -1),
  new Rule('h' , 'vim-mode:move-left'               , -1),
  new Rule('l' , 'vim-mode:move-right'              , -1),
  new Rule('k' , 'vim-mode:move-up'                 , -1),

  new Rule('w' , 'vim-mode:move-to-next-word'       , 4),
  new Rule('W' , 'vim-mode:move-to-next-whole-word' , 4),
  new Rule('b' , 'vim-mode:move-to-previous-word'   , 4),
  new Rule('B' , 'vim-mode:move-to-previous-whole-word', 4),

  new Rule('t' , 'vim-mode:till'                    , 6),
  new Rule('T' , 'vim-mode:till-backwards'          , 6),

  new Rule('gg', 'vim-mode:move-to-start-of-file'   , 2),
  new Rule('G' , 'vim-mode:move-to-line'            , 2),

  new Rule('L' , 'editor:move-to-end-of-line'       , 3),
  new Rule('A' , 'vim-mode:insert-after-end-of-line', 2),

  new Rule('n' , 'vim-mode:repeat-search'           , 3),
  new Rule('N' , 'vim-mode:repeat-search-backwards' , 3),

  new Rule('^d', 'vim-mode:scroll-half-screen-down' , 5),
  new Rule('^u', 'vim-mode:scroll-half-screen-up'   , 5),

  new Rule('u' , 'vim-mode:undo'                    , -5),
  new Rule('y' , 'vim-mode:yank'                    , 1),

  new Rule('^e', 'vim-mode:reset-normal-mode'       , 4),
  new Rule('.' , 'vim-mode:repeat'                  , 3)
]
