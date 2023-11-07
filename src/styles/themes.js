import { createTheme } from '@mui/material/styles'

export const light = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: 'light',
    primary: {
      main: '#ffffff'
    },
    secondary: {
      main: '#181818'
    },
    text: {
      primary: '#181818'
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff'
    }
  }
})

export const dark = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    }
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#181818'
    },
    secondary: {
      main: '#ffffff'
    },
    text: {
      primary: '#ffffff'
    },
    background: {
      default: '#1c1c1c',
      paper: '#424242'
    }
  }
})
