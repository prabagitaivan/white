import React, { Component } from 'react'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import './global.css'
import theme from './theme'

const generateClassName = (rule, styleSheet) => {
  const prefix = styleSheet.options.classNamePrefix
  const name = `${prefix}-${rule.key}`

  if (prefix.match(/^Mui/)) return name
  else return `White${name}`
}

export default class Styles extends Component {
  render () {
    const { children } = this.props

    return (
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StylesProvider>
    )
  }
}
