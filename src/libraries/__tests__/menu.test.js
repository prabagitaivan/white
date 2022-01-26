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
      expect(menu.RandomNotes).toEqual({
        name: 'random notes',
        options: randomNotes,
        route: '/random-notes'
      })
      expect(menu.TreeBookmarks).toEqual({
        name: 'tree bookmarks',
        options: null,
        route: '/tree-bookmarks'
      })
      expect(menu.Playground).toEqual({
        name: 'playground',
        options: null,
        route: '/playground'
      })
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
      const left = randomNotes.left.map(note => note.Icon)
      const right = randomNotes.right.map(note => note.Icon)
      expect(left).toMatchSnapshot()
      expect(right).toMatchSnapshot()
    })
    it('return all correct text and order', () => {
      mockRandomNotesStore({})
      const left = randomNotes.left.map(note => note.text)
      const right = randomNotes.right.map(note => note.text)
      expect(left).toEqual(['shuffle-notes'])
      expect(right).toEqual(['open-random'])
    })
    it('shuffle notes if data exists', () => {
      mockRandomNotesStore({ data: [1, 2] })
      const shuffleOption = randomNotes.left[0]
      shuffleOption.action()
      expect(_.shuffle).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('not shuffle notes if data empty', () => {
      mockRandomNotesStore({})
      const shuffleOption = randomNotes.left[0]
      shuffleOption.action()
      expect(_.shuffle).not.toHaveBeenCalled()
      expect(store.dispatch).not.toHaveBeenCalled()
    })
    it('open 1 random note if data exists', () => {
      mockRandomNotesStore({ data: [{ url: 1 }, { url: 2 }] })
      const randomOption = randomNotes.right[0]
      randomOption.action()
      expect(_.random).toHaveBeenCalledTimes(1)
      expect(window.open).toHaveBeenCalledTimes(1)
    })
    it('not open 1 random note if data empty', () => {
      mockRandomNotesStore({})
      const randomOption = randomNotes.right[0]
      randomOption.action()
      expect(_.random).not.toHaveBeenCalled()
      expect(window.open).not.toHaveBeenCalled()
    })
  })
})
