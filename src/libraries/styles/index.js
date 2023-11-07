export const generateClassName = (rule, styleSheet) => {
  const prefix = styleSheet.options.classNamePrefix
  const name = `${prefix}-${rule.key}`

  return `White${name}`
}
