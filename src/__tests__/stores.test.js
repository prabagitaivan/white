import { render } from '@testing-library/react'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider, useStore } from 'react-redux'
import { createStore } from '../stores'
import reducers from '../reducers'

const App = () => {
  const store = useStore()
  return <div>{JSON.stringify(store.getState())}</div>
}

function renderApp (preloadedState = undefined) {
  const store = createStore(preloadedState)
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  return JSON.parse(container.firstChild.textContent)
}

describe('main Stores', () => {
  it('return default state', () => {
    const AppStore = renderApp()
    const defaultStore = configureStore({ reducer: reducers }).getState()

    expect(AppStore).toEqual(defaultStore)
  })
  it('return with overwrite preloaded state', () => {
    const preloadedState = { status: { online: false } }
    const AppStore = renderApp(preloadedState)
    const defaultStore = configureStore({ reducer: reducers }).getState()
    const withPreloadedStore = { ...defaultStore, ...preloadedState }

    expect(AppStore).not.toEqual(defaultStore)
    expect(AppStore).toEqual(withPreloadedStore)
  })
})
