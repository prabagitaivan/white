import { configureStore } from '@reduxjs/toolkit'
import { applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

export const createStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancers = [applyMiddleware(sagaMiddleware)]

  const store = configureStore({ reducer: reducers, preloadedState, enhancers })
  sagas.forEach(sagaMiddleware.run)

  return store
}

export default createStore()
