import React from 'react'
import { useSelector } from 'react-redux'
import { StylesProvider, ThemeProvider } from '@material-ui/styles'
import { CssBaseline } from '@material-ui/core'
import './global.css'
import * as themes from './themes'
import { generateClassName } from './libraries'

export default ({ children }) => {
  const { light } = useSelector(state => state.status)
  const theme = light ? themes.light : themes.dark

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StylesProvider>
  )
}
