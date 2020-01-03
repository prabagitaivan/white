import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setConnection, setScreen } from './reducers/status'
import Home from './layouts/Home'

class App extends Component {
  componentDidMount () {
    window.addEventListener('online', this.online)
    window.addEventListener('offline', this.offline)
    window.addEventListener('resize', this.resize)

    this.resize()
  }

  componentWillUnmount () {
    window.removeEventListener('online', this.online)
    window.removeEventListener('offline', this.offline)
    window.removeEventListener('resize', this.resize)
  }

  online = () => {
    this.props.setConnection(true)
  }

  offline = () => {
    this.props.setConnection(false)
  }

  resize = () => {
    this.props.setScreen(window.innerWidth)
  }

  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapDispatchToProps = { setConnection, setScreen }

export default connect(undefined, mapDispatchToProps)(App)
