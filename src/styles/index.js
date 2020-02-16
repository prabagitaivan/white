import React from 'react'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import './global.css'
import theme from './theme'
import { generateClassName } from './libraries'

export default ({ children }) => (
  <StylesProvider generateClassName={generateClassName}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  </StylesProvider>
)
