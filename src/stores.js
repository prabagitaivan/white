import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import sagas from './sagas'

export default preloadedState => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = applyMiddleware(sagaMiddleware)

  const store = createStore(reducers, preloadedState, enhancer)
  sagas.forEach(sagaMiddleware.run)

  return store
}
