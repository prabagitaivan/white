import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(
  {
    root: ({ desktop }) => ({
      paddingTop: desktop ? 65 : 15,
      paddingBottom: desktop ? 80 : 110
    })
  },
  { name: 'Content' }
)

export default memo(({ children }) => {
  const { desktop } = useSelector(state => state.status)
  const classes = useStyles({ desktop })

  return (
    <Container id='content' className={classes.root}>
      {children}
    </Container>
  )
})
