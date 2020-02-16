import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createStore from './stores'
import Styles from './styles'
import App from './app'
import * as serviceWorker from './serviceWorker'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <Styles>
      <App />
    </Styles>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
