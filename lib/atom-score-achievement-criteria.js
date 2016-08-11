'use babel';

export const apmEq    = amount => current => current.apm   >   amount

export const scoreEq  = amount => current => current.score === amount

export const keyCombo = combo  => current => {
  const keys = current.commands.slice(0, combo.length).reverse().join('')
  return keys === combo.join('')
}

export const cumulativeGroupCount = (amount, group) => current => {
  const triggered = group.includes(current.latest.command)
  const count     = current.counts[current.latest.command]
  return triggered && count === amount
}

export const cumulativeGroupRate = (rate, group) => current => {
  const triggered = group.includes(current.latest.command)
  const count     = current.counts[current.latest.command]
  return triggered && (count % rate) === 0
}
