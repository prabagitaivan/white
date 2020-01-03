import React from 'react'
import ReactDOM from 'react-dom'
import Stores from './stores'
import Styles from './styles'
import App from './app'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Stores>
    <Styles>
      <App />
    </Styles>
  </Stores>,
  document.getElementById('root')
)

serviceWorker.unregister()
