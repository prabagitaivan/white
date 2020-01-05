import { render, getByTestId } from '@testing-library/react'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createStore } from 'redux'
import Stores from '../stores'
import reducers from '../reducers'

class AppComponent extends PureComponent {
  render () {
    const store = JSON.stringify(this.props.store)
    return <div data-testid='data'>{store}</div>
  }
}
const mapStateToProps = state => ({ store: state })
const App = connect(mapStateToProps)(AppComponent)

function getStoresStore (preloadedState = undefined) {
  const { container } = render(
    <Stores preloadedState={preloadedState}>
      <App />
    </Stores>
  )

  return JSON.parse(getByTestId(container, 'data').firstChild.textContent)
}

describe('Stores', () => {
  it('return default state', () => {
    const StoresStore = getStoresStore()
    const defaultStore = createStore(reducers).getState()

    expect(StoresStore).toEqual(defaultStore)
  })
  it('return with overwrite preloaded state', () => {
    const preloadedState = { status: { online: false } }
    const StoresStore = getStoresStore(preloadedState)
    const defaultStore = createStore(reducers).getState()
    const withPreloadedStore = { ...defaultStore, ...preloadedState }

    expect(StoresStore).not.toEqual(defaultStore)
    expect(StoresStore).toEqual(withPreloadedStore)
  })
})
