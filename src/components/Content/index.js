import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
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

export default memo(({ children }) => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <Container id='content' className={classes.container}>
      {children}
    </Container>
  )
})
