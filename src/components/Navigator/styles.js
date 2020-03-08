import { makeStyles } from '@material-ui/styles'

export default makeStyles(
  {
    appBar: {
      height: 50,
      justifyContent: 'center',
      top: ({ desktop }) => (desktop ? 0 : 'auto'),
      bottom: ({ desktop }) => (desktop ? 'auto' : 0)
    },
    grow: {
      flexGrow: 1
    },
    fab: {
      position: 'absolute',
      zIndex: 1,
      top: ({ desktop }) => (desktop ? 'initial' : -25),
      bottom: ({ desktop }) => (desktop ? -25 : 'initial'),
      left: 0,
      right: 0,
      margin: '0 auto'
    },
    emoji: {
      position: 'absolute',
      top: 6.5,
      bottom: 0,
      left: 0,
      right: 0,
      fontSize: 30
    },
    githubIcon: {
      padding: 2
    }
  },
  { name: 'Navigator' }
)
