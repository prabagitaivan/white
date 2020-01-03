import React, { Component } from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './global.css'
import theme from './theme'

export default class Styles extends Component {
  render () {
    const { children } = this.props

    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    )
  }
}
