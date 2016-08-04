'use babel'

class Rule {
  constructor(command, points) {
    this.command = command
    this.points  = points
  }
}

export const rules = [
  new Rule('editor:fold-current-row'         , 2),
  new Rule('editor:unfold-current-row'       , -2),
  new Rule('vim-mode:move-down'              , -1),
  new Rule('vim-mode:move-left'              , -1),
  new Rule('vim-mode:move-right'             , -1),
  new Rule('vim-mode:move-to-next-word'      , 4),
  new Rule('vim-mode:move-to-start-of-file'  , 2),
  new Rule('vim-mode:move-up'                , -1),
  new Rule('vim-mode:repeat-search'          , 3),
  new Rule('vim-mode:repeat-search-backwards', 3),
  new Rule('vim-mode:scroll-half-screen-down', 5),
  new Rule('vim-mode:scroll-half-screen-up'  , 5),
  new Rule('vim-mode:undo'                   , -5),
  new Rule('vim-mode:yank'                   , 1),
]
