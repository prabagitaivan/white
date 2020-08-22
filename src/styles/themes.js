import { createMuiTheme } from '@material-ui/core/styles'

export const light = createMuiTheme({
  palette: {
    primary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#000000'
    },
    secondary: {
      light: '#969696',
      main: '#686868',
      dark: '#3e3e3e',
      contrastText: '#ffffff'
    },
    action: {
      active: '#686868'
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa'
    },
    text: {
      primary: '#000000'
    }
  }
})

export const dark = createMuiTheme({
  palette: {
    primary: {
      light: '#969696',
      main: '#686868',
      dark: '#3e3e3e',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ffffff',
      main: '#fafafa',
      dark: '#c7c7c7',
      contrastText: '#000000'
    },
    action: {
      active: '#fafafa'
    },
    background: {
      default: '#3e3e3e',
      paper: '#686868'
    },
    text: {
      primary: '#ffffff'
    }
  }
})
