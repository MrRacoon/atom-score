'use babel'

export const notify = (type, title, description)  =>
  atom.notifications[type](description ? `${title} :: ${description}` : title)

export const success    = (title, description) => notify('addSuccess', title, description)
export const info       = (title, description) => notify('addInfo', title, description)
export const warning    = (title, description) => notify('addWarning', title, description)
export const error      = (title, description) => notify('addError', title, description)
export const fatalError = (title, description) => notify('addFatalError', title, description)

export const achievement = (ach) => {
  const func = ach.score > 0 ? success : ach.score < 0 ? warning : info
  func(ach.title, ach.description)
}
