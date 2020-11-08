import { makeStyles } from '@material-ui/styles'

export default makeStyles(
  {
    container: {
      position: 'fixed',
      top: ({ desktop }) => (desktop ? -7.5 : 7.5),
      bottom: ({ desktop }) => (desktop ? -7.5 : -30),
      paddingTop: ({ desktop }) => (desktop ? 80 : 20),
      paddingBottom: ({ desktop }) => (desktop ? 20 : 80),

      '& > *': {
        height: '100%',
        overflow: 'auto',

        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }
    }
  },
  { name: 'Content' }
)
