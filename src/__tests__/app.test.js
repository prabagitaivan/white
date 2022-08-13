import { render } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import store from '../stores'
import Styles from '../styles'
import { setConnection, setScreen } from '../reducers/status'
import App from '../app'
import RandomNotes from '../layouts/RandomNotes'
import TreeBookmarks from '../layouts/TreeBookmarks'
import Playground from '../layouts/Playground'
import * as emoji from '../libraries/emoji'

function setConnectionEvent (online) {
  window.navigator.onLine = online
  window.dispatchEvent(new Event(online ? 'online' : 'offline'))
}
function setScreenEvent (size) {
  window.innerWidth = size
  window.dispatchEvent(new Event('resize'))
}

beforeEach(() => {
  jest
    .spyOn(emoji, 'getRandomEmoji')
    .mockReturnValue({ image: '😁', text: 'emoji-1' })
  jest.spyOn(store, 'dispatch').mockReturnValue()
})
afterEach(() => {
  emoji.getRandomEmoji.mockRestore()
  store.dispatch.mockRestore()
})

describe.only('main App', () => {
  describe('routers', () => {
    it('render RandomNotes for / (root) router', () => {
      const history = createBrowserHistory()

      const AppRender = render(
        <Provider store={store}>
          <Styles>
            <Router history={history}>
              <App />
            </Router>
          </Styles>
        </Provider>
      )
      const RandomNotesRender = render(
        <Provider store={store}>
          <Styles>
            <RandomNotes />
          </Styles>
        </Provider>
      )

      expect(AppRender.container).toEqual(RandomNotesRender.container)
    })
    it('render RandomNotes for /random-notes router', () => {
      const history = createBrowserHistory()
      history.push('/random-notes')

      const AppRender = render(
        <Provider store={store}>
          <Styles>
            <Router history={history}>
              <App />
            </Router>
          </Styles>
        </Provider>
      )
      const RandomNotesRender = render(
        <Provider store={store}>
          <Styles>
            <RandomNotes />
          </Styles>
        </Provider>
      )

      expect(AppRender.container).toEqual(RandomNotesRender.container)
    })
    it('render TreeBookmarks for /tree-bookmarks router', () => {
      const history = createBrowserHistory()
      history.push('/tree-bookmarks')

      const AppRender = render(
        <Provider store={store}>
          <Styles>
            <Router history={history}>
              <App />
            </Router>
          </Styles>
        </Provider>
      )
      const TreeBookmarksRender = render(
        <Provider store={store}>
          <Styles>
            <TreeBookmarks />
          </Styles>
        </Provider>
      )

      expect(AppRender.container).toEqual(TreeBookmarksRender.container)
    })
    it('render Playground for /playground router', () => {
      const history = createBrowserHistory()
      history.push('/playground')

      const AppRender = render(
        <Provider store={store}>
          <Styles>
            <Router history={history}>
              <App />
            </Router>
          </Styles>
        </Provider>
      )
      const PlaygroundRender = render(
        <Provider store={store}>
          <Styles>
            <Playground />
          </Styles>
        </Provider>
      )

      const AppEditors = AppRender.container.getElementsByClassName(
        'cm-activeLine cm-line'
      )
      const PlaygroundEditors = PlaygroundRender.container.getElementsByClassName(
        'cm-activeLine cm-line'
      )
      expect(AppEditors).toEqual(PlaygroundEditors)
    })
  })
  describe('mounting', () => {
    let AppRender

    beforeEach(() => {
      // default event config
      setConnectionEvent(true)
      setScreenEvent(1024)

      AppRender = render(
        <Provider store={store}>
          <Styles>
            <App />
          </Styles>
        </Provider>
      )
    })

    it('listen for online event after mount', () => {
      // need to make it offline first
      setConnectionEvent(false)

      setConnectionEvent(true)
      expect(store.dispatch).toHaveBeenCalledWith(setConnection(true))
    })
    it('listen for offline after mount', () => {
      setConnectionEvent(false)
      expect(store.dispatch).toHaveBeenCalledWith(setConnection(false))
    })
    it('listen for resize after mount', () => {
      // after mount event
      expect(store.dispatch).toHaveBeenCalledWith(setScreen(1024))

      setScreenEvent(768)
      expect(store.dispatch).toHaveBeenCalledWith(setScreen(768))

      setScreenEvent(1440)
      expect(store.dispatch).toHaveBeenCalledWith(setScreen(1440))
    })
    it('stop listen for online after unmount', () => {
      // need to make it offline first
      setConnectionEvent(false)

      AppRender.unmount()

      setConnectionEvent(true)
      expect(store.dispatch).not.toHaveBeenCalledWith(setConnection(true))
    })
    it('stop listen for offline after unmount', () => {
      AppRender.unmount()

      setConnectionEvent(false)
      expect(store.dispatch).not.toHaveBeenCalledWith(setConnection(false))
    })
    it('stop listen for resize after unmount', () => {
      // after mount event
      expect(store.dispatch).toHaveBeenCalledWith(setScreen(1024))

      AppRender.unmount()

      setScreenEvent(768)
      expect(store.dispatch).not.toHaveBeenCalledWith(setScreen(768))

      setScreenEvent(480)
      expect(store.dispatch).not.toHaveBeenCalledWith(setScreen(480))
    })
  })
})
