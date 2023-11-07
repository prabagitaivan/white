import React from 'react'
import { useSelector } from 'react-redux'
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles'
import { StylesProvider } from '@mui/styles'
import { CssBaseline } from '@mui/material'
import './global.css'
import * as themes from './themes'
import { generateClassName } from '../libraries/styles'

export default ({ children }) => {
  const { light } = useSelector(state => state.status)
  const theme = light ? themes.light : themes.dark

  return (
    <StyledEngineProvider injectFirst>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </StylesProvider>
    </StyledEngineProvider>
  )
}
