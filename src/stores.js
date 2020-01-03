import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

export default class Stores extends Component {
  configureStore = () => {
    const { preloadedState } = this.props
    const sagaMiddleware = createSagaMiddleware()
    const enhancer = applyMiddleware(sagaMiddleware)

    const store = createStore(reducers, preloadedState, enhancer)
    sagas.forEach(sagaMiddleware.run)

    return store
  }

  render () {
    const { children } = this.props
    const store = this.configureStore()

    return <Provider store={store}>{children}</Provider>
  }
}
