import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import createStore from '../../stores'
import Styles from '../../styles'
import { setTheme } from '../../reducers/status'
import * as emoji from '../../libraries/emoji'
import Navigator from '../Navigator'

let store

function renderNavigator ({ desktop = true, light = true }) {
  const preloadedState = { status: { desktop, light } }
  store = createStore(preloadedState)

  jest.spyOn(store, 'dispatch').mockReturnValue()

  return render(
    <Provider store={store}>
      <Styles>
        <Navigator />
      </Styles>
    </Provider>
  )
}

describe('components Navigator', () => {
  describe('snapshots', () => {
    it('contain navigations and its icon on light theme', () => {
      const { getByText, getByTitle } = renderNavigator({})
      expect(getByText('Random Notes')).toBeInTheDocument()
      expect(getByTitle('Random Notes')).toMatchSnapshot()
      expect(getByTitle('Repository')).toMatchSnapshot()
      expect(getByTitle('Light / Dark Theme')).toMatchSnapshot()
    })
    it('contain navigations and its icon on dark theme', () => {
      const { getByTitle } = renderNavigator({ light: false })
      expect(getByTitle('Light / Dark Theme')).toMatchSnapshot()
    })
    it('show in top for desktop', () => {
      const { container } = renderNavigator({})
      expect(container.firstChild).toHaveStyle('top: 0px')
    })
    it('show in bottom for mobile', () => {
      const { container } = renderNavigator({ desktop: false })
      expect(container.firstChild).toHaveStyle('bottom: 0px')
    })
  })
  describe('userEvent', () => {
    beforeEach(() => {
      jest.spyOn(window, 'open').mockReturnValue()
      jest.spyOn(emoji, 'getRandomEmoji')
    })
    afterEach(() => {
      window.open.mockRestore()
      emoji.getRandomEmoji.mockRestore()
      store.dispatch.mockRestore()
    })

    it('open this repository when click the Repository', () => {
      const { getByTitle } = renderNavigator({})
      const repo = getByTitle('Repository')

      userEvent.click(repo)
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/prabagitaivan/white'
      )
    })
    it('random emoji when click the Emoji avatar', () => {
      const { getByRole } = renderNavigator({})
      const avatar = getByRole('img')

      userEvent.click(avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(1)

      userEvent.click(avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(2)
    })
    it('switch to dark theme when click the Light / Dark Theme in light theme', () => {
      const { getByTitle } = renderNavigator({})
      const theme = getByTitle('Light / Dark Theme')

      userEvent.click(theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(false))
    })
    it('switch to light theme when click the Light / Dark Theme in dark theme', () => {
      const { getByTitle } = renderNavigator({ light: false })
      const theme = getByTitle('Light / Dark Theme')

      userEvent.click(theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(true))
    })
  })
})
