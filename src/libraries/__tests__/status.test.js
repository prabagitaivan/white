import { isLightMode, isMacPlatform } from '../../libraries/status'

const resetDate = Date
const resetNavigator = window.navigator

function mockIsLightMode (hour) {
  global.Date = jest.fn(() => ({
    getHours: jest.fn().mockReturnValue(hour)
  }))

  return isLightMode()
}
function mockIsMacPlatform (platform) {
  window.navigator.platform = platform

  return isMacPlatform()
}

afterEach(() => {
  global.Date = resetDate
  window.navigator = resetNavigator
})

describe('libraries styles', () => {
  describe('main', () => {
    it('return light status based on hour time', () => {
      expect(mockIsLightMode(0)).toEqual(false)
      expect(mockIsLightMode(3)).toEqual(false)
      expect(mockIsLightMode(6)).toEqual(true)
      expect(mockIsLightMode(9)).toEqual(true)
      expect(mockIsLightMode(12)).toEqual(true)
      expect(mockIsLightMode(15)).toEqual(true)
      expect(mockIsLightMode(18)).toEqual(false)
      expect(mockIsLightMode(21)).toEqual(false)
    })
    it("return mac platform status based on navigator's platform", () => {
      expect(mockIsMacPlatform('Android')).toEqual(false)
      expect(mockIsMacPlatform('Linux')).toEqual(false)
      expect(mockIsMacPlatform()).toEqual(false)
      expect(mockIsMacPlatform('iPhone')).toEqual(false)
      expect(mockIsMacPlatform('Macintosh')).toEqual(true)
      expect(mockIsMacPlatform('MacIntel')).toEqual(true)
    })
  })
})
