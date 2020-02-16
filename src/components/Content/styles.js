import { makeStyles } from '@material-ui/styles'

export default makeStyles(
  {
    container: ({ desktop }) => ({
      paddingTop: desktop ? 85 : 15,
      paddingBottom: desktop ? 20 : 80
    })
  },
  { name: 'Content' }
)
