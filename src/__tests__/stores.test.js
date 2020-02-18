import { render, getByTestId } from '@testing-library/react'
import React from 'react'
import { createStore as ReduxCreateStore } from 'redux'
import { Provider, useStore } from 'react-redux'
import createStore from '../stores'
import reducers from '../reducers'

const App = () => {
  const store = useStore()
  return <div data-testid='data'>{JSON.stringify(store.getState())}</div>
}

function renderApp (preloadedState = undefined) {
  const store = createStore(preloadedState)
  const { container } = render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  return JSON.parse(getByTestId(container, 'data').firstChild.textContent)
}

describe('main Stores', () => {
  it('return default state', () => {
    const AppStore = renderApp()
    const defaultStore = ReduxCreateStore(reducers).getState()

    expect(AppStore).toEqual(defaultStore)
  })
  it('return with overwrite preloaded state', () => {
    const preloadedState = { status: { online: false } }
    const AppStore = renderApp(preloadedState)
    const defaultStore = ReduxCreateStore(reducers).getState()
    const withPreloadedStore = { ...defaultStore, ...preloadedState }

    expect(AppStore).not.toEqual(defaultStore)
    expect(AppStore).toEqual(withPreloadedStore)
  })
})
