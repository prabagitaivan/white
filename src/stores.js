import { createStore as ReduxCreateStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

export const createStore = preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = applyMiddleware(sagaMiddleware)

  const store = ReduxCreateStore(reducers, preloadedState, enhancer)
  sagas.forEach(sagaMiddleware.run)

  return store
}

export default createStore()
