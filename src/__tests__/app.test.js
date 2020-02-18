import { render } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import createStore from '../stores'
import Styles from '../styles'
import { setConnection, setScreen } from '../reducers/status'
import App from '../app'
import Home from '../layouts/Home'

function setConnectionEvent (online) {
  window.navigator.onLine = online
  window.dispatchEvent(new Event(online ? 'online' : 'offline'))
}
function setScreenEvent (size) {
  window.innerWidth = size
  window.dispatchEvent(new Event('resize'))
}

const store = createStore()

beforeEach(() => {
  jest.spyOn(store, 'dispatch').mockReturnValue()
})
afterEach(() => {
  store.dispatch.mockRestore()
})

describe('main App', () => {
  describe('routers', () => {
    it('render Home for initial router', () => {
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
      const HomeRender = render(
        <Provider store={store}>
          <Styles>
            <Home />
          </Styles>
        </Provider>
      )

      expect(AppRender.container).toEqual(HomeRender.container)
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
