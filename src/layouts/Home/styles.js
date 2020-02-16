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
    gridListTileBar: ({ desktop }) => ({
      height: desktop ? 48 : 40
    }),
    title: {
      fontSize: ({ desktop }) => (desktop ? 24 : 15),
      lineHeight: 'normal',
      whiteSpace: 'normal',
      color: 'rgba(255, 255, 255, 0.85)'
    }
  },
  { name: `${layout}Notes` }
)
