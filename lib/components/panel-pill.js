'use babel'

class PanelPill extends HTMLElement {
  constructor(label, value) {
    // That
    super()
  }

  attachedCallback () {

    // This
    this.classList.add('panel-pill')
    this.classList.add('inline-block')

    // Label
    this.label = document.createElement('div')
    this.label.classList.add('panel-pill-label')
    this.label.classList.add('inline-block')
    this.appendChild(this.label)

    // Value
    this.value = document.createElement('div')
    this.value.classList.add('panel-pill-value')
    this.value.classList.add('inline-block')
    this.appendChild(this.value)

  }

  setLabel (label = '') {
    console.log(label)
    if (this.label) { this.label.textContent = label }
    return this
  }

  setValue (value = '') {
    console.log(value)
    if (this.value) {
      this.value.textContent = value
    }
    return this
  }

}


const PanelPillComponent = document.registerElement('atom-score-panel-pill', {
  prototype: Object.create(PanelPill.prototype),
})

export default PanelPillComponent
