import { makeStyles } from '@material-ui/styles'

const layout = 'TreeBookmarks'

export const loading = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40vh'
    },
    linearProgress: {
      height: 10,
      width: '60%',

      '& .MuiLinearProgress-barColorSecondary': {
        backgroundColor: '#b1b1b1'
      }
    }
  },
  { name: `${layout}Loading` }
)

export const empty = makeStyles(
  {
    root: {
      textAlign: 'center',
      marginTop: '40vh'
    }
  },
  { name: `${layout}Empty` }
)

export const tree = makeStyles(
  {
    root: {
      marginTop: -7.5,
      paddingTop: -7.5,
      paddingBottom: 10
    },
    tree: {
      '& .MuiTreeItem-group': {
        marginLeft: 7,
        paddingLeft: 14,
        borderLeft: `1px dashed gray`
      },
      '& .MuiTreeItem-label': {
        width: ({ desktop }) => (desktop ? '98%' : '91%')
      }
    },
    fontRoot: {
      fontSize: 20,
      marginTop: -1.5,
      fontWeight: 'bolder'
    },
    fontSubdata: {
      fontSize: 18,
      marginTop: -2.5
    },
    fontText: {
      fontSize: 15
    },
    fontUrl: {
      fontSize: 10,
      fontWeight: 'lighter'
    }
  },
  { name: `${layout}Tree` }
)
