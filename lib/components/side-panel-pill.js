'use babel'

class SidePanelPill extends HTMLElement {
  constructor() { super() }

  attachedCallback () {

    // This
    this.classList.add('side-panel-pill')
    // this.classList.add('inline-block')

    // Label
    this.label = document.createElement('div')
    this.label.classList.add('side-panel-pill-label')
    // this.label.classList.add('inline-block')
    this.appendChild(this.label)

    // Value
    this.value = document.createElement('div')
    this.value.classList.add('side-panel-pill-value')
    // this.value.classList.add('inline-block')
    this.appendChild(this.value)

  }

  setLabel (label = '') {
    if (this.label) { this.label.textContent = label }
    return this
  }

  setValue (value = '') {
    if (this.value) { this.value.textContent = value }
    return this
  }

}


const SidePanelPillComponent = document.registerElement('atom-score-side-panel-pill', {
  prototype: Object.create(SidePanelPill.prototype),
})

export default SidePanelPillComponent
