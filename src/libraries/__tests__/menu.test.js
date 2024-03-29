import { FlashOn, Loop } from '@mui/icons-material'
import _ from 'lodash'
import store from '../../stores'
import menu from '../menu'
import randomNotes from '../menu/randomNotes'
import tapePlayers from '../menu/tapePlayers'

function mockRandomNotesStore ({ data = [] }) {
  jest.spyOn(store, 'getState').mockReturnValue({ randomNotes: { data } })
}
function mockTapePlayersStore ({ data = [] }) {
  jest.spyOn(store, 'getState').mockReturnValue({ tapePlayers: { data } })
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
        options: [],
        route: '/tree-bookmarks'
      })
      expect(menu.Playground).toEqual({
        name: 'playground',
        options: [],
        route: '/playground'
      })
      expect(menu.TapePlayers).toEqual({
        name: 'tape players',
        options: tapePlayers,
        route: '/tape-players'
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

    it('return all correct text, icon and order', () => {
      mockRandomNotesStore({})
      const icons = randomNotes.map(note => note.Icon)
      const texts = randomNotes.map(note => note.text)
      expect(icons).toEqual([Loop, FlashOn])
      expect(texts).toEqual(['shuffle-notes', 'open-random'])
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
  describe('tape players', () => {
    beforeEach(() => {
      jest.spyOn(_, 'shuffle').mockReturnValue([])
      jest.spyOn(store, 'dispatch').mockReturnValue()
    })
    afterEach(() => {
      _.shuffle.mockRestore()
      store.dispatch.mockRestore()
      store.getState.mockRestore()
    })

    it('return all correct text, icon and order', () => {
      mockTapePlayersStore({})
      const icons = tapePlayers.map(note => note.Icon)
      const texts = tapePlayers.map(note => note.text)
      expect(icons).toEqual([Loop])
      expect(texts).toEqual(['shuffle-players'])
    })
    it('shuffle players if data exists', () => {
      mockTapePlayersStore({ data: [1, 2] })
      const shuffleOption = tapePlayers[0]
      shuffleOption.action()
      expect(_.shuffle).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('not shuffle notes if data empty', () => {
      mockTapePlayersStore({})
      const shuffleOption = tapePlayers[0]
      shuffleOption.action()
      expect(_.shuffle).not.toHaveBeenCalled()
      expect(store.dispatch).not.toHaveBeenCalled()
    })
  })
})
