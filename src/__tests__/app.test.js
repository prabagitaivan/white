import { render } from '@testing-library/react'
import React from 'react'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Stores from '../stores'
import Styles from '../styles'
import App, { mapDispatchToProps as AppReducers } from '../app'
import Home from '../layouts/Home'

function onlineConnectionEvent () {
  window.navigator.onLine = true
  window.dispatchEvent(new Event('online'))
}
function offlineConnectionEvent () {
  window.navigator.onLine = false
  window.dispatchEvent(new Event('offline'))
}
function desktopScreenEvent () {
  window.innerWidth = 1024
  window.dispatchEvent(new Event('resize'))
}
function mobileScreenEvent () {
  window.innerWidth = 480
  window.dispatchEvent(new Event('resize'))
}

describe('main App', () => {
  describe('routers', () => {
    it('render Home for initial router', () => {
      const history = createBrowserHistory()
      const AppRender = render(
        <Stores>
          <Styles>
            <Router history={history}>
              <App />
            </Router>
          </Styles>
        </Stores>
      )
      const HomeRender = render(
        <Stores>
          <Styles>
            <Home />
          </Styles>
        </Stores>
      )

      expect(AppRender.container).toEqual(HomeRender.container)
    })
  })
  describe('mounting', () => {
    let AppRender

    beforeEach(() => {
      jest.spyOn(AppReducers, 'setConnection')
      jest.spyOn(AppReducers, 'setScreen')

      // default event config
      onlineConnectionEvent()
      desktopScreenEvent()

      AppRender = render(
        <Stores>
          <Styles>
            <App />
          </Styles>
        </Stores>
      )
    })
    afterEach(() => {
      jest.restoreAllMocks()
    })

    it('listen for online event after mount', () => {
      // need to make it offline first
      offlineConnectionEvent()

      onlineConnectionEvent()
      expect(AppReducers.setConnection).toHaveBeenCalledWith(true)
    })
    it('listen for offline after mount', () => {
      offlineConnectionEvent()
      expect(AppReducers.setConnection).toHaveBeenCalledWith(false)
    })
    it('listen for resize after mount', () => {
      // after mount event
      expect(AppReducers.setScreen).toHaveBeenCalledWith(1024)

      desktopScreenEvent()
      expect(AppReducers.setScreen).toHaveBeenCalledWith(1024)

      mobileScreenEvent()
      expect(AppReducers.setScreen).toHaveBeenCalledWith(480)

      // expected 3 for after mount event and then desktop and mobile event above
      expect(AppReducers.setScreen).toHaveBeenCalledTimes(3)
    })
    it('stop listen for online after unmount', () => {
      // need to make it offline first
      offlineConnectionEvent()

      AppRender.unmount()

      onlineConnectionEvent()
      expect(AppReducers.setConnection).not.toHaveBeenCalledWith(true)
    })
    it('stop listen for offline after unmount', () => {
      AppRender.unmount()

      offlineConnectionEvent()
      expect(AppReducers.setConnection).not.toHaveBeenCalledWith(false)
    })
    it('stop listen for resize after unmount', () => {
      // after mount event
      expect(AppReducers.setScreen).toHaveBeenCalledWith(1024)

      AppRender.unmount()

      desktopScreenEvent()
      mobileScreenEvent()

      // expected 1 for after mount event
      expect(AppReducers.setScreen).toHaveBeenCalledTimes(1)
    })
  })
})
