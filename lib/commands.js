'use babel'

export class Rule {

  constructor(key, command, points, time = Date.now()) {
    Object.assign(this, { key, command, points, time })
  }

  timeStamped() {
    return new Rule(this.key, this.command, this.points, Date.now())
  }

  resetTime() {
    this.time = Date.now()
  }
}

export const rules = [
  new Rule('zc', 'editor:fold-current-row'          , 2),
  new Rule('zo', 'editor:unfold-current-row'        , -2),

  new Rule('j' , 'vim-mode:move-down'               , -1),
  new Rule('h' , 'vim-mode:move-left'               , -1),
  new Rule('l' , 'vim-mode:move-right'              , -1),
  new Rule('k' , 'vim-mode:move-up'                 , -1),

  new Rule('w' , 'vim-mode:move-to-next-word'       , 2),
  new Rule('W' , 'vim-mode:move-to-next-whole-word' , 2),
  new Rule('e' , 'vim-mode:move-to-end-of-word'     , 2),
  new Rule('E' , 'vim-mode:move-to-end-of-whole-word', 2),
  new Rule('b' , 'vim-mode:move-to-previous-word'    , 2),
  new Rule('B' , 'vim-mode:move-to-previous-whole-word', 2),

  new Rule('zt', 'vim-mode:scroll-cursor-to-top-leave'   , 3),
  new Rule('z.', 'vim-mode:scroll-cursor-to-middle'      , 2),
  new Rule('zz', 'vim-mode:scroll-cursor-to-middle-leave', 3),
  new Rule('z-', 'vim-mode:scroll-cursor-to-bottom'      , 2),
  new Rule('zb', 'vim-mode:scroll-cursor-to-bottom-leave', 3),
  new Rule('zs', 'vim-mode:scroll-cursor-to-left'        , 2),
  new Rule('ze', 'vim-mode:scroll-cursor-to-right'       , 2),

  new Rule('t' , 'vim-mode:till'                    , 3),
  new Rule('T' , 'vim-mode:till-backwards'          , 3),

  new Rule('gg', 'vim-mode:move-to-start-of-file'   , 1),
  new Rule('g' , 'vim-mode:move-to-line'            , 1),

  new Rule('L' , 'editor:move-to-end-of-line'       , 3),
  new Rule('H' , 'editor:move-to-beginning-of-line' , 3),

  new Rule('A' , 'vim-mode:insert-after-end-of-line', 1),
  new Rule('a' , 'vim-mode:insert-after', 2),

  new Rule('i' , 'vim-mode:activate-insert-mode'    , 2),
  new Rule('I' , 'vim-mode:insert-at-beginning-of-line', 2),

  new Rule('o' , 'vim-mode:insert-below-with-newline', 1),
  new Rule('O' , 'vim-mode:insert-above-with-newline', 1),

  new Rule('n' , 'vim-mode:repeat-search'           , 3),
  new Rule('N' , 'vim-mode:repeat-search-backwards' , 3),

  new Rule('^d', 'vim-mode:scroll-half-screen-down' , 3),
  new Rule('^u', 'vim-mode:scroll-half-screen-up'   , 3),

  new Rule('u' , 'vim-mode:undo'                    , -5),
  new Rule('^r' , 'core:redo'                       , -5),
  new Rule('y' , 'vim-mode:yank'                    , 1),

  new Rule('^e', 'vim-mode:reset-normal-mode'       , 1),
  new Rule('.' , 'vim-mode:repeat'                  , 2),

  // Ex-mode doesn't call commands, does it raw
  //new Rule(':w', 'core:save'                        , 1),
  //new Rule(':w', 'pane:save-items'                  , 1),
  //new Rule(':w', 'window:save-all'                  , 1),

  // Git Plus
  new Rule(',gi=', 'git-plus:add-all-commit-and-push', 10),
]

export const sample = () => rules[Math.floor(Math.random() * rules.length)]