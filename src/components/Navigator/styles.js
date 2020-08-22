import { makeStyles } from '@material-ui/styles'

const layout = 'Navigator'

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
    compressIcon: {
      padding: 2
    },
    themeContainer: {
      marginLeft: 10
    }
  },
  { name: layout }
)

export const menu = makeStyles(
  {
    button: {
      fontSize: ({ desktop }) => (desktop ? 12 : 10),
      textTransform: 'initial',

      '& .MuiButton-startIcon': {
        marginTop: -3,
        marginRight: 2
      },
      '& .MuiButton-startIcon > svg': {
        fontSize: 24
      }
    },
    menu: {
      position: 'fixed',
      top: ({ desktop }) => (desktop ? 55 : 'initial'),
      left: ({ desktop }) => (desktop ? 17 : 7),
      bottom: ({ desktop }) => (desktop ? 'initial' : 55)
    },
    option: {
      paddingLeft: 8,
      paddingRight: 8,

      '& .MuiButton-root': {
        fontSize: ({ desktop }) => (desktop ? 12 : 10),
        textTransform: 'initial',
        backgroundColor: 'transparent'
      },
      '& .MuiButton-startIcon': {
        marginRight: 2
      },
      '& .MuiButton-startIcon > svg': {
        fontSize: 24
      }
    }
  },
  { name: `${layout}Menu` }
)
