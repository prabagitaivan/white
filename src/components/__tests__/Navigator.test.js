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
    it('contain option menu', () => {
      // use RandomNotes default page
      const { getAllByText, getByTitle } = renderNavigator({})
      expect(getAllByText('Random Notes')[0]).toBeInTheDocument()
      expect(getByTitle('Menu')).toMatchSnapshot()
    })
    it('contain side menu on light theme', () => {
      const { getByTitle } = renderNavigator({})
      expect(getByTitle('Repository')).toMatchSnapshot()
      expect(getByTitle('Light / Dark Theme')).toMatchSnapshot()
    })
    it('contain side menu on dark theme', () => {
      const { getByTitle } = renderNavigator({ light: false })
      expect(getByTitle('Repository')).toMatchSnapshot()
      expect(getByTitle('Light / Dark Theme')).toMatchSnapshot()
    })
    it('contain link menu', () => {
      const { container } = renderNavigator({ light: false })
      expect(container.firstChild.lastChild).toMatchSnapshot()
    })
    it('highlight current page as active in link menu', () => {
      // use RandomNotes default page
      const { getAllByText } = renderNavigator({})
      expect(getAllByText('Random Notes')[1]).not.toHaveStyle('color: #b1b1b1')
    })
    it('dim other pages as inactive in link menu', () => {
      // use RandomNotes default page
      const { getByText } = renderNavigator({})
      expect(getByText('Tree Bookmarks')).toHaveStyle('color: #b1b1b1')
    })
    it('show main menu in top for desktop', () => {
      const { container } = renderNavigator({})
      expect(container.firstChild).toHaveStyle('top: 0px')
    })
    it('show main menu in bottom for mobile', () => {
      const { container } = renderNavigator({ desktop: false })
      expect(container.firstChild).toHaveStyle('bottom: 0px')
    })
    it('show link menu in top for mobile', () => {
      const { container } = renderNavigator({ desktop: false })
      expect(container.firstChild.lastChild).toHaveStyle('top: 0px')
    })
    it('show link menu in bottom for desktop', () => {
      const { container } = renderNavigator({})
      expect(container.firstChild.lastChild).toHaveStyle('bottom: 0px')
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

    it('open option menu list when click Menu', () => {
      // use RandomNotes option menu list, testing it shows
      const { getByText, getByTitle } = renderNavigator({})
      const Menu = getByTitle('Menu')

      userEvent.click(Menu)
      expect(getByText('Shuffle Notes')).toBeInTheDocument()
    })
    it("do action and close when click one of the Menu's option", () => {
      // use RandomNotes option menu list, testing it shows
      const { getByText, getByTitle, queryByText } = renderNavigator({})
      const Menu = getByTitle('Menu')

      userEvent.click(Menu)
      const ShuffleOption = getByText('Shuffle Notes')

      userEvent.click(ShuffleOption)
      expect(store.getState).toHaveBeenCalled()
      expect(queryByText('Shuffle Notes')).not.toBeInTheDocument()
    })
    it('open this repository when click the Repository', () => {
      const { getByTitle } = renderNavigator({})
      const Repo = getByTitle('Repository')

      userEvent.click(Repo)
      expect(window.open).toHaveBeenCalledWith(
        'https://github.com/prabagitaivan/white'
      )
    })
    it('random emoji when click the Emoji avatar', () => {
      const { getByRole } = renderNavigator({})
      const Avatar = getByRole('img')

      userEvent.click(Avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(1)

      userEvent.click(Avatar)
      expect(emoji.getRandomEmoji).toHaveBeenCalledTimes(2)
    })
    it('switch to dark theme when click the Light / Dark Theme in light theme', () => {
      const { getByTitle } = renderNavigator({})
      const Theme = getByTitle('Light / Dark Theme')

      userEvent.click(Theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(false))
    })
    it('switch to light theme when click the Light / Dark Theme in dark theme', () => {
      const { getByTitle } = renderNavigator({ light: false })
      const Theme = getByTitle('Light / Dark Theme')

      userEvent.click(Theme)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledWith(setTheme(true))
    })
    it('open and navigate the page when click it page in link menu', () => {
      const { getByText } = renderNavigator({})
      const Link = getByText('Tree Bookmarks')

      userEvent.click(Link)
      expect(history.location.pathname).toEqual('/tree-bookmarks')
    })
  })
})
