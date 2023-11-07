import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from './stores'
import Styles from './styles'
import App from './app'
import * as serviceWorker from './serviceWorker'

const element = document.getElementById('root')
const root = createRoot(element)

root.render(
  <Provider store={store}>
    <Styles>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Styles>
  </Provider>
)

serviceWorker.unregister()
