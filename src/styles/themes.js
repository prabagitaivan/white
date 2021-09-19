import { createMuiTheme } from '@material-ui/core/styles'

export const light = createMuiTheme({
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
      default: '#fafafa'
    }
  }
})

export const dark = createMuiTheme({
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
      default: '#1c1c1c'
    }
  }
})
