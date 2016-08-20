'use babel';

export const notify = (type) => (msg) => atom.notifications[type](msg);

export const success    = notify('addSuccess');
export const info       = notify('addInfo');
export const warning    = notify('addWarning');
export const error      = notify('addError');
export const fatalError = notify('addFatalError');
