export const isLightMode = () => {
  const hour = new Date().getHours()

  if (hour >= 6 && hour <= 17) return true
  else return false
}

export const isMacPlatform = () => {
  // use deprecated version as the new one still have minim browser support
  // https://developer.mozilla.org/en-US/docs/Web/API/NavigatorUAData/platform
  const platform = window.navigator.platform || ''

  return platform.indexOf('Mac') === 0
}
