export const generateClassName = (rule, styleSheet) => {
  const prefix = styleSheet.options.classNamePrefix
  const name = `${prefix}-${rule.key}`

  if (prefix.match(/^Mui/)) return name
  else return `White${name}`
}

export const getLightStatus = () => {
  const hour = new Date().getHours()

  if (hour >= 6 && hour <= 17) return true
  else return false
}
