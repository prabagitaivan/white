import { makeStyles } from '@material-ui/styles'

const layout = 'Home'

export const loading = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    linearProgress: {
      height: 10,
      width: '60%'
    }
  },
  { name: `${layout}Loading` }
)

export const empty = makeStyles(
  {
    root: {
      textAlign: 'center'
    }
  },
  { name: `${layout}Empty` }
)

export const notes = makeStyles(
  {
    img: {
      cursor: 'pointer'
    },
    gridListTileBar: {
      height: 50,

      '& .MuiGridListTileBar-titleWrap': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiGridListTileBar-rootSubtitle': {
        marginLeft: 10,
        marginRight: 10
      },
      '& .MuiGridListTileBar-title': {
        fontSize: 15,
        lineHeight: 'normal',
        color: 'rgba(255, 255, 255, 0.85)'
      },
      '& .MuiGridListTileBar-subtitle': {
        fontSize: 12,
        lineHeight: 'normal',
        color: 'rgba(255, 255, 255, 0.75)'
      }
    }
  },
  { name: `${layout}Notes` }
)
