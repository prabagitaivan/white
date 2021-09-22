import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { createStore } from '../../stores'
import Styles from '../../styles'
import { setTheme } from '../../reducers/status'
import * as emoji from '../../libraries/emoji'
import Navigator from '../Navigator'

let store
let history

function renderNavigator ({ desktop = true, light = true }) {
  const preloadedState = {
    status: { desktop, light, page: 'RandomNotes' },
    randomNotes: { data: [] }
  }
  store = createStore(preloadedState)
  history = createBrowserHistory()

  jest.spyOn(store, 'dispatch').mockReturnValue()
  jest.spyOn(store, 'getState')

  return render(
    <Provider store={store}>
      <Styles>
        <Router history={history}>
          <Navigator />
        </Router>
      </Styles>
    </Provider>
  )
}

describe('components Navigator', () => {
  describe('snapshots', () => {
    it('highlight current page as active in menu', () => {
      // use RandomNotes default page
      const { getByText } = renderNavigator({})
      expect(getByText('random notes')).not.toHaveStyle('color: #b1b1b1')
    })
    it('dim other pages as inactive in menu', () => {
      // use RandomNotes default page
      const { getByText } = renderNavigator({})
      expect(getByText('tree bookmarks')).toHaveStyle('color: #b1b1b1')
    })
    it('contain side menu on light theme', () => {
      const { container } = renderNavigator({})
      const Repo = container.querySelector('#navigator-toolbar-repository')
      const Theme = container.querySelector('#navigator-toolbar-theme')

      expect(Repo).toMatchSnapshot()
      expect(Theme).toMatchSnapshot()
    })
    it('contain side menu on dark theme', () => {
      const { container } = renderNavigator({ light: false })
      const Repo = container.querySelector('#navigator-toolbar-repository')
      const Theme = container.querySelector('#navigator-toolbar-theme')

      expect(Repo).toMatchSnapshot()
      expect(Theme).toMatchSnapshot()
    })
    it('contain fab menu', () => {
      // use RandomNotes default page
      const { container } = renderNavigator({})
      const Shuffle = container.querySelector('#navigator-fab-shuffle-notes')
      const Emoji = container.querySelector('#navigator-fab-emoji')
      const Random = container.querySelector('#navigator-fab-open-random')

      expect(Shuffle).toBeInTheDocument()
      expect(Emoji).toBeInTheDocument()
      expect(Random).toBeInTheDocument()

      // skip emoji match snapshot because random generator
      expect(Shuffle).toMatchSnapshot()
      expect(Random).toMatchSnapshot()
    })
    it('show menu in top for desktop', () => {
      const { container } = renderNavigator({})
      expect(container.firstChild).toHaveStyle('top: 0px')
    })
    it('show menu in bottom for mobile', () => {
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
      store.getState.mockRestore()
    })

    it('open and navigate the page when click it page in menu', () => {
      const { getByText } = renderNavigator({})
      const RandomNotes = getByText('random notes')
      const TreeBookmarks = getByText('tree bookmarks')

      userEvent.click(RandomNotes)
      expect(history.location.pathname).toEqual('/random-notes')
      userEvent.click(TreeBookmarks)
      expect(history.location.pathname).toEqual('/tree-bookmarks')
    })
    it('open this repository when click the Repository from side menu', () => {
      const { container } = renderNavigator({})
      const Repo = container.querySelector('#navigator-toolbar-repository')

      userEvent.click(Repo)
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/prabagitaivan/white'
      )
    })
    it('switch to dark theme when click the Theme from side menu', () => {
      const { container } = renderNavigator({})
      const Theme = container.querySelector('#navigator-toolbar-theme')

      userEvent.click(Theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(false))
    })
    it('switch to light theme when click the Theme from side menu', () => {
      const { container } = renderNavigator({ light: false })
      const Theme = container.querySelector('#navigator-toolbar-theme')

      userEvent.click(Theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(true))
    })
    it('random emoji when click the main fab menu', () => {
      const { getByRole } = renderNavigator({})
      const Avatar = getByRole('img')

      userEvent.click(Avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(1)

      userEvent.click(Avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(2)
    })
    it('do option when click left fab menu', () => {
      // use RandomNotes option menu list
      const { container } = renderNavigator({})
      const Shuffle = container.querySelector('#navigator-fab-shuffle-notes')

      userEvent.click(Shuffle)
      expect(store.getState).toHaveBeenCalled()
    })
    it('do option when click right fab menu', () => {
      // use RandomNotes option menu list
      const { container } = renderNavigator({})
      const Random = container.querySelector('#navigator-fab-open-random')

      userEvent.click(Random)
      expect(store.getState).toHaveBeenCalled()
    })
  })
})
