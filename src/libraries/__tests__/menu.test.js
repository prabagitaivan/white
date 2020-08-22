import _ from 'lodash'
import store from '../../stores'
import menu from '../menu'
import randomNotes from '../menu/randomNotes'

function mockRandomNotesStore ({ data = [] }) {
  jest.spyOn(store, 'getState').mockReturnValue({ randomNotes: { data } })
}

describe('libraries menu', () => {
  describe('data', () => {
    it('return all correct menu', () => {
      expect(menu.Home).toEqual({ name: 'Random Notes', options: randomNotes })
    })
  })
  describe('random notes', () => {
    beforeEach(() => {
      jest.spyOn(_, 'shuffle').mockReturnValue([])
      jest.spyOn(_, 'random').mockReturnValue(0)
      jest.spyOn(store, 'dispatch').mockReturnValue()
      jest.spyOn(window, 'open').mockReturnValue()
    })
    afterEach(() => {
      _.shuffle.mockRestore()
      _.random.mockRestore()
      store.dispatch.mockRestore()
      store.getState.mockRestore()
      window.open.mockRestore()
    })

    it('return all correct icon and order', () => {
      mockRandomNotesStore({})
      const icons = randomNotes.map(note => note.Icon)
      expect(icons).toMatchSnapshot()
    })
    it('return all correct text and order', () => {
      mockRandomNotesStore({})
      const texts = randomNotes.map(note => note.text)
      expect(texts[0]).toEqual('Shuffle Notes')
      expect(texts[1]).toEqual('Open Random')
    })
    it('shuffle notes if data exists', () => {
      mockRandomNotesStore({ data: [1, 2] })
      const shuffleOption = randomNotes[0]
      shuffleOption.action()
      expect(_.shuffle).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('not shuffle notes if data empty', () => {
      mockRandomNotesStore({})
      const shuffleOption = randomNotes[0]
      shuffleOption.action()
      expect(_.shuffle).not.toHaveBeenCalled()
      expect(store.dispatch).not.toHaveBeenCalled()
    })
    it('open 1 random note if data exists', () => {
      mockRandomNotesStore({ data: [{ url: 1 }, { url: 2 }] })
      const randomOption = randomNotes[1]
      randomOption.action()
      expect(_.random).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledTimes(1)
    })
    it('not open 1 random note if data empty', () => {
      mockRandomNotesStore({})
      const randomOption = randomNotes[1]
      randomOption.action()
      expect(_.random).not.toHaveBeenCalled()
      expect(window.open).not.toHaveBeenCalled()
    })
  })
})
