'use babel'

export default class AtomScoreNotify {

  constructor(config) {
    this.config = config
  }

  serialize() {
    return this.config
  }

  destroy() { }

  // ===========================================================================

  register (notifications) {
    this.notifications = notifications
  }

  notify (type, message) {
    this.notifications[type](message)
  }

  success (message) {
    this.notify('addSuccess', message)
  }

  info (message) {
    this.notify('addInfo', message)
  }

  warning (message) {
    this.notify('addWarning', message)
  }

  error(message) {
    this.notify('addError', message)
  }

  fatalError(message) {
    this.notify('addFatalError', message)
  }

  update (score) {
    this.info(JSON.stringify(score))
  }

  achievement (ach) {
    var msg = `${ach.title} : ${ach.description}`
    switch(true) {
      case ach.score > 0:
        this.success(msg)
        break;
      case ach.score === 0:
        this.info(msg)
        break;
      case ach.score < 0:
        this.warning(msg)
        break;
    }
  }
}
