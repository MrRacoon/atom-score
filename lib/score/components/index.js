'use babel'

import ScorePill from './panel-pill'

const scorePill = document.registerElement('score-pill', {
  prototype: ScorePill.prototype,
  extends: 'div'
})

export default { scorePill }
