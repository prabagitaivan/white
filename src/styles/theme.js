import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
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
    }
  }
})

export default theme
