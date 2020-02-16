export const generateClassName = (rule, styleSheet) => {
  const prefix = styleSheet.options.classNamePrefix
  const name = `${prefix}-${rule.key}`

  if (prefix.match(/^Mui/)) return name
  else return `White${name}`
}
