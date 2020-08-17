import menu from '../menu'

describe('libraries menu', () => {
  describe('data', () => {
    it('return all correct menu', () => {
      expect(menu.Home).toEqual({ name: 'Random Notes' })
    })
  })
})
